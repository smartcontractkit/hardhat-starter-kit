interface Chai {
    Assertion: ChaiAssertionType;
}
interface ChaiAssertionInstance {
    assert: ChaiAssert;
    _obj: any;
    __flags: any;
}
interface ChaiAssertionType {
    overwriteMethod: (name: string, _super: (expected: any) => any) => void;
    new (): ChaiAssertionInstance;
}
declare type ChaiAssert = (condition: boolean, failMessage?: string, negatedFailMessage?: string, expected?: any, actual?: any) => void;
export declare function revertErrorHelper(_chai: Chai): void;
export {};
//# sourceMappingURL=chai_revert_error.d.ts.map