import HDNode = require('hdkey');
import { DerivedHDKeyInfo } from '../types';
export declare const walletUtils: {
    calculateDerivedHDKeyInfos(parentDerivedKeyInfo: DerivedHDKeyInfo, numberOfKeys: number): DerivedHDKeyInfo[];
    findDerivedKeyInfoForAddressIfExists(address: string, parentDerivedKeyInfo: DerivedHDKeyInfo, searchLimit: number): DerivedHDKeyInfo | undefined;
    addressOfHDKey(hdKey: HDNode): string;
};
//# sourceMappingURL=wallet_utils.d.ts.map