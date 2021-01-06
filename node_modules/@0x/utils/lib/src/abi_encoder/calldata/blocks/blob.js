"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const calldata_block_1 = require("../calldata_block");
class BlobCalldataBlock extends calldata_block_1.CalldataBlock {
    constructor(name, signature, parentName, blob) {
        const headerSizeInBytes = 0;
        const bodySizeInBytes = blob.byteLength;
        super(name, signature, parentName, headerSizeInBytes, bodySizeInBytes);
        this._blob = blob;
    }
    toBuffer() {
        return this._blob;
    }
    getRawData() {
        return this._blob;
    }
}
exports.BlobCalldataBlock = BlobCalldataBlock;
//# sourceMappingURL=blob.js.map