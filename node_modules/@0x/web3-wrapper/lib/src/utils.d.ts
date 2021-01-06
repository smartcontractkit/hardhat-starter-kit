import { BigNumber } from '@0x/utils';
export declare const utils: {
    convertHexToNumber(value: string): number;
    convertHexToNumberOrNull(hex: string | null): number | null;
    convertAmountToBigNumber(value: string | number | BigNumber): BigNumber;
    encodeAmountAsHexString(value: string | number | BigNumber): string;
    numberToHex(value: number): string;
    isHexStrict(hex: string | number): boolean;
};
//# sourceMappingURL=utils.d.ts.map