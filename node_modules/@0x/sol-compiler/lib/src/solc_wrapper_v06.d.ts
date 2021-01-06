import { CompilerOptions, StandardOutput } from 'ethereum-types';
import solc = require('solc');
import { SolcWrapperV05 } from './solc_wrapper_v05';
export declare class SolcWrapperV06 extends SolcWrapperV05 {
    constructor(solcVersion: string, opts: CompilerOptions);
    protected _compileInputAsync(input: solc.StandardInput): Promise<StandardOutput>;
    protected _normalizeOutput(output: StandardOutput): StandardOutput;
}
//# sourceMappingURL=solc_wrapper_v06.d.ts.map