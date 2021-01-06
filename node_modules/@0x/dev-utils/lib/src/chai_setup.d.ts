import { RevertError } from '@0x/utils';
declare global {
    namespace Chai {
        interface Assertion {
            revertWith: (expected: string | RevertError) => Promise<void>;
        }
    }
}
export declare const chaiSetup: {
    configure(): void;
};
//# sourceMappingURL=chai_setup.d.ts.map