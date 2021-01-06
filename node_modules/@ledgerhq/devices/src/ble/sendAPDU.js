// @flow

import { Observable } from "rxjs";
import { log } from "@ledgerhq/logs";

const TagId = 0x05;

function chunkBuffer(
  buffer: Buffer,
  sizeForIndex: number => number
): Array<Buffer> {
  const chunks = [];
  for (
    let i = 0, size = sizeForIndex(0);
    i < buffer.length;
    i += size, size = sizeForIndex(i)
  ) {
    chunks.push(buffer.slice(i, i + size));
  }
  return chunks;
}

export const sendAPDU = (
  write: Buffer => Promise<void>,
  apdu: Buffer,
  mtuSize: number
): Observable<void> => {
  const chunks = chunkBuffer(apdu, i => mtuSize - (i === 0 ? 5 : 3)).map(
    (buffer, i) => {
      const head = Buffer.alloc(i === 0 ? 5 : 3);
      head.writeUInt8(TagId, 0);
      head.writeUInt16BE(i, 1);
      if (i === 0) {
        head.writeUInt16BE(apdu.length, 3);
      }
      return Buffer.concat([head, buffer]);
    }
  );

  return Observable.create(o => {
    let terminated = false;

    async function main() {
      for (const chunk of chunks) {
        if (terminated) return;
        await write(chunk);
      }
    }

    main().then(
      () => {
        terminated = true;
        o.complete();
      },
      e => {
        terminated = true;
        log("ble-error", "sendAPDU failure " + String(e));
        o.error(e);
      }
    );

    const unsubscribe = () => {
      if (!terminated) {
        log("ble-verbose", "sendAPDU interruption");
        terminated = true;
      }
    };

    return unsubscribe;
  });
};
