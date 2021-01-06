// @flow

import { TransportError, DisconnectedDevice } from "@ledgerhq/errors";
import { Observable } from "rxjs";
import { log } from "@ledgerhq/logs";

const TagId = 0x05;

// operator that transform the input raw stream into one apdu response and finishes
export const receiveAPDU = (
  rawStream: Observable<Buffer>
): Observable<Buffer> =>
  Observable.create(o => {
    let notifiedIndex = 0;
    let notifiedDataLength = 0;
    let notifiedData = Buffer.alloc(0);

    const sub = rawStream.subscribe({
      complete: () => {
        o.error(new DisconnectedDevice());
        sub.unsubscribe();
      },
      error: e => {
        log("ble-error", "in receiveAPDU " + String(e));
        o.error(e);
        sub.unsubscribe();
      },
      next: value => {
        const tag = value.readUInt8(0);
        const index = value.readUInt16BE(1);
        let data = value.slice(3);

        if (tag !== TagId) {
          o.error(
            new TransportError("Invalid tag " + tag.toString(16), "InvalidTag")
          );
          return;
        }

        if (notifiedIndex !== index) {
          o.error(
            new TransportError(
              "BLE: Invalid sequence number. discontinued chunk. Received " +
                index +
                " but expected " +
                notifiedIndex,
              "InvalidSequence"
            )
          );
          return;
        }

        if (index === 0) {
          notifiedDataLength = data.readUInt16BE(0);
          data = data.slice(2);
        }
        notifiedIndex++;
        notifiedData = Buffer.concat([notifiedData, data]);
        if (notifiedData.length > notifiedDataLength) {
          o.error(
            new TransportError(
              "BLE: received too much data. discontinued chunk. Received " +
                notifiedData.length +
                " but expected " +
                notifiedDataLength,
              "BLETooMuchData"
            )
          );
          return;
        }
        if (notifiedData.length === notifiedDataLength) {
          o.next(notifiedData);
          o.complete();
          sub.unsubscribe();
        }
      }
    });

    return () => {
      sub.unsubscribe();
    };
  });
