"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.putGenesisBlock = void 0;
const Block_1 = require("../types/Block");
async function putGenesisBlock(blockchain, common) {
    const genesisBlock = new Block_1.Block(null, { common });
    genesisBlock.setGenesisParams();
    await blockchain.addBlock(genesisBlock);
}
exports.putGenesisBlock = putGenesisBlock;
//# sourceMappingURL=putGenesisBlock.js.map