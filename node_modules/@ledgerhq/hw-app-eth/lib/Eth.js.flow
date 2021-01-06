/********************************************************************************
 *   Ledger Node JS API
 *   (c) 2016-2017 Ledger
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 ********************************************************************************/
//@flow

// FIXME drop:
import { splitPath, foreach } from "./utils";
import { EthAppPleaseEnableContractData } from "@ledgerhq/errors";
import type Transport from "@ledgerhq/hw-transport";

const remapTransactionRelatedErrors = e => {
  if (e && e.statusCode === 0x6a80) {
    return new EthAppPleaseEnableContractData(
      "Please enable Contract data on the Ethereum app Settings"
    );
  }
  return e;
};

/**
 * Ethereum API
 *
 * @example
 * import Eth from "@ledgerhq/hw-app-eth";
 * const eth = new Eth(transport)
 */
export default class Eth {
  transport: Transport<*>;

  constructor(transport: Transport<*>, scrambleKey: string = "w0w") {
    this.transport = transport;
    transport.decorateAppAPIMethods(
      this,
      [
        "getAddress",
        "provideERC20TokenInformation",
        "signTransaction",
        "signPersonalMessage",
        "getAppConfiguration"
      ],
      scrambleKey
    );
  }

  /**
   * get Ethereum address for a given BIP 32 path.
   * @param path a path in BIP 32 format
   * @option boolDisplay optionally enable or not the display
   * @option boolChaincode optionally enable or not the chaincode request
   * @return an object with a publicKey, address and (optionally) chainCode
   * @example
   * eth.getAddress("44'/60'/0'/0/0").then(o => o.address)
   */
  getAddress(
    path: string,
    boolDisplay?: boolean,
    boolChaincode?: boolean
  ): Promise<{
    publicKey: string,
    address: string,
    chainCode?: string
  }> {
    let paths = splitPath(path);
    let buffer = new Buffer(1 + paths.length * 4);
    buffer[0] = paths.length;
    paths.forEach((element, index) => {
      buffer.writeUInt32BE(element, 1 + 4 * index);
    });
    return this.transport
      .send(
        0xe0,
        0x02,
        boolDisplay ? 0x01 : 0x00,
        boolChaincode ? 0x01 : 0x00,
        buffer
      )
      .then(response => {
        let result = {};
        let publicKeyLength = response[0];
        let addressLength = response[1 + publicKeyLength];
        result.publicKey = response
          .slice(1, 1 + publicKeyLength)
          .toString("hex");
        result.address =
          "0x" +
          response
            .slice(
              1 + publicKeyLength + 1,
              1 + publicKeyLength + 1 + addressLength
            )
            .toString("ascii");
        if (boolChaincode) {
          result.chainCode = response
            .slice(
              1 + publicKeyLength + 1 + addressLength,
              1 + publicKeyLength + 1 + addressLength + 32
            )
            .toString("hex");
        }
        return result;
      });
  }

  /**
   * This commands provides a trusted description of an ERC 20 token
   * to associate a contract address with a ticker and number of decimals.
   *
   * It shall be run immediately before performing a transaction involving a contract
   * calling this contract address to display the proper token information to the user if necessary.
   *
   * @param {*} info: a blob from "erc20.js" utilities that contains all token information.
   *
   * @example
   * import { byContractAddress } from "@ledgerhq/hw-app-eth/erc20"
   * const zrxInfo = byContractAddress("0xe41d2489571d322189246dafa5ebde1f4699f498")
   * if (zrxInfo) await appEth.provideERC20TokenInformation(zrxInfo)
   * const signed = await appEth.signTransaction(path, rawTxHex)
   */
  provideERC20TokenInformation({ data }: { data: Buffer }): Promise<boolean> {
    return this.transport.send(0xe0, 0x0a, 0x00, 0x00, data).then(
      () => true,
      e => {
        if (e && e.statusCode === 0x6d00) {
          // this case happen for older version of ETH app, since older app version had the ERC20 data hardcoded, it's fine to assume it worked.
          // we return a flag to know if the call was effective or not
          return false;
        }
        throw e;
      }
    );
  }

  /**
   * You can sign a transaction and retrieve v, r, s given the raw transaction and the BIP 32 path of the account to sign
   * @example
   eth.signTransaction("44'/60'/0'/0/0", "e8018504e3b292008252089428ee52a8f3d6e5d15f8b131996950d7f296c7952872bd72a2487400080").then(result => ...)
   */
  signTransaction(
    path: string,
    rawTxHex: string
  ): Promise<{
    s: string,
    v: string,
    r: string
  }> {
    let paths = splitPath(path);
    let offset = 0;
    let rawTx = new Buffer(rawTxHex, "hex");
    let toSend = [];
    let response;
    while (offset !== rawTx.length) {
      let maxChunkSize = offset === 0 ? 150 - 1 - paths.length * 4 : 150;
      let chunkSize =
        offset + maxChunkSize > rawTx.length
          ? rawTx.length - offset
          : maxChunkSize;
      let buffer = new Buffer(
        offset === 0 ? 1 + paths.length * 4 + chunkSize : chunkSize
      );
      if (offset === 0) {
        buffer[0] = paths.length;
        paths.forEach((element, index) => {
          buffer.writeUInt32BE(element, 1 + 4 * index);
        });
        rawTx.copy(buffer, 1 + 4 * paths.length, offset, offset + chunkSize);
      } else {
        rawTx.copy(buffer, 0, offset, offset + chunkSize);
      }
      toSend.push(buffer);
      offset += chunkSize;
    }
    return foreach(toSend, (data, i) =>
      this.transport
        .send(0xe0, 0x04, i === 0 ? 0x00 : 0x80, 0x00, data)
        .then(apduResponse => {
          response = apduResponse;
        })
    ).then(
      () => {
        const v = response.slice(0, 1).toString("hex");
        const r = response.slice(1, 1 + 32).toString("hex");
        const s = response.slice(1 + 32, 1 + 32 + 32).toString("hex");
        return { v, r, s };
      },
      e => {
        throw remapTransactionRelatedErrors(e);
      }
    );
  }

  /**
   */
  getAppConfiguration(): Promise<{
    arbitraryDataEnabled: number,
    version: string
  }> {
    return this.transport.send(0xe0, 0x06, 0x00, 0x00).then(response => {
      let result = {};
      result.arbitraryDataEnabled = response[0] & 0x01;
      result.version = "" + response[1] + "." + response[2] + "." + response[3];
      return result;
    });
  }

  /**
  * You can sign a message according to eth_sign RPC call and retrieve v, r, s given the message and the BIP 32 path of the account to sign.
  * @example
eth.signPersonalMessage("44'/60'/0'/0/0", Buffer.from("test").toString("hex")).then(result => {
  var v = result['v'] - 27;
  v = v.toString(16);
  if (v.length < 2) {
    v = "0" + v;
  }
  console.log("Signature 0x" + result['r'] + result['s'] + v);
})
   */
  signPersonalMessage(
    path: string,
    messageHex: string
  ): Promise<{
    v: number,
    s: string,
    r: string
  }> {
    let paths = splitPath(path);
    let offset = 0;
    let message = new Buffer(messageHex, "hex");
    let toSend = [];
    let response;
    while (offset !== message.length) {
      let maxChunkSize = offset === 0 ? 150 - 1 - paths.length * 4 - 4 : 150;
      let chunkSize =
        offset + maxChunkSize > message.length
          ? message.length - offset
          : maxChunkSize;
      let buffer = new Buffer(
        offset === 0 ? 1 + paths.length * 4 + 4 + chunkSize : chunkSize
      );
      if (offset === 0) {
        buffer[0] = paths.length;
        paths.forEach((element, index) => {
          buffer.writeUInt32BE(element, 1 + 4 * index);
        });
        buffer.writeUInt32BE(message.length, 1 + 4 * paths.length);
        message.copy(
          buffer,
          1 + 4 * paths.length + 4,
          offset,
          offset + chunkSize
        );
      } else {
        message.copy(buffer, 0, offset, offset + chunkSize);
      }
      toSend.push(buffer);
      offset += chunkSize;
    }
    return foreach(toSend, (data, i) =>
      this.transport
        .send(0xe0, 0x08, i === 0 ? 0x00 : 0x80, 0x00, data)
        .then(apduResponse => {
          response = apduResponse;
        })
    ).then(() => {
      const v = response[0];
      const r = response.slice(1, 1 + 32).toString("hex");
      const s = response.slice(1 + 32, 1 + 32 + 32).toString("hex");
      return { v, r, s };
    });
  }
}
