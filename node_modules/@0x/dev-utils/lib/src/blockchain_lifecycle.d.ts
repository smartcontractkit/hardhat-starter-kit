import { Web3Wrapper } from '@0x/web3-wrapper';
export declare class BlockchainLifecycle {
    private readonly _web3Wrapper;
    private readonly _snapshotIdsStack;
    private _addresses;
    private _nodeType;
    constructor(web3Wrapper: Web3Wrapper);
    startAsync(): Promise<void>;
    revertAsync(): Promise<void>;
    private _mineMinimumBlocksAsync;
    private _getNodeTypeAsync;
    private _mineDummyBlockAsync;
}
//# sourceMappingURL=blockchain_lifecycle.d.ts.map