// @flow
import blob from "../data/erc20.js";

/**
 * Retrieve the token information by a given contract address if any
 */
export const byContractAddress = (contract: string): ?TokenInfo =>
  get().byContract(asContractAddress(contract));

/**
 * list all the ERC20 tokens informations
 */
export const list = (): TokenInfo[] => get().list();

export type TokenInfo = {
  contractAddress: string,
  ticker: string,
  decimals: number,
  chainId: number,
  signature: Buffer,
  data: Buffer
};

export type API = {
  byContract: string => ?TokenInfo,
  list: () => TokenInfo[]
};

const asContractAddress = (addr: string) => {
  const a = addr.toLowerCase();
  return a.startsWith("0x") ? a : "0x" + a;
};

// this internal get() will lazy load and cache the data from the erc20 data blob
const get: () => API = (() => {
  let cache;
  return () => {
    if (cache) return cache;
    const buf = Buffer.from(blob, "base64");
    const byContract = {};
    const entries = [];
    let i = 0;
    while (i < buf.length) {
      const length = buf.readUInt32BE(i);
      i += 4;
      const item = buf.slice(i, i + length);
      let j = 0;
      const tickerLength = item.readUInt8(j);
      j += 1;
      const ticker = item.slice(j, j + tickerLength).toString("ascii");
      j += tickerLength;
      const contractAddress = asContractAddress(
        item.slice(j, j + 20).toString("hex")
      );
      j += 20;
      const decimals = item.readUInt32BE(j);
      j += 4;
      const chainId = item.readUInt32BE(j);
      j += 4;
      const signature = item.slice(j);
      const entry: $Exact<TokenInfo> = {
        ticker,
        contractAddress,
        decimals,
        chainId,
        signature,
        data: item
      };
      entries.push(entry);
      byContract[contractAddress] = entry;
      i += length;
    }
    const api = {
      list: () => entries,
      byContract: contractAddress => byContract[contractAddress]
    };
    cache = api;
    return api;
  };
})();
