// @flow

import { TransportError } from "@ledgerhq/errors";

export type ResponseAcc = ?{
  data: Buffer,
  dataLength: number,
  sequence: number
};

const Tag = 0x05;

function asUInt16BE(value) {
  const b = Buffer.alloc(2);
  b.writeUInt16BE(value, 0);
  return b;
}

const initialAcc = {
  data: Buffer.alloc(0),
  dataLength: 0,
  sequence: 0
};

/**
 *
 */
const createHIDframing = (channel: number, packetSize: number) => {
  return {
    makeBlocks(apdu: Buffer): Buffer[] {
      let data = Buffer.concat([asUInt16BE(apdu.length), apdu]);
      const blockSize = packetSize - 5;
      const nbBlocks = Math.ceil(data.length / blockSize);
      data = Buffer.concat([
        data, // fill data with padding
        Buffer.alloc(nbBlocks * blockSize - data.length + 1).fill(0)
      ]);

      const blocks = [];
      for (let i = 0; i < nbBlocks; i++) {
        const head = Buffer.alloc(5);
        head.writeUInt16BE(channel, 0);
        head.writeUInt8(Tag, 2);
        head.writeUInt16BE(i, 3);
        const chunk = data.slice(i * blockSize, (i + 1) * blockSize);
        blocks.push(Buffer.concat([head, chunk]));
      }
      return blocks;
    },

    reduceResponse(acc: ResponseAcc, chunk: Buffer): ResponseAcc {
      let { data, dataLength, sequence } = acc || initialAcc;

      if (chunk.readUInt16BE(0) !== channel) {
        throw new TransportError("Invalid channel", "InvalidChannel");
      }
      if (chunk.readUInt8(2) !== Tag) {
        throw new TransportError("Invalid tag", "InvalidTag");
      }
      if (chunk.readUInt16BE(3) !== sequence) {
        throw new TransportError("Invalid sequence", "InvalidSequence");
      }

      if (!acc) {
        dataLength = chunk.readUInt16BE(5);
      }
      sequence++;
      const chunkData = chunk.slice(acc ? 5 : 7);
      data = Buffer.concat([data, chunkData]);
      if (data.length > dataLength) {
        data = data.slice(0, dataLength);
      }

      return {
        data,
        dataLength,
        sequence
      };
    },

    getReducedResult(acc: ResponseAcc): ?Buffer {
      if (acc && acc.dataLength === acc.data.length) {
        return acc.data;
      }
    }
  };
};

export default createHIDframing;
