import { BigNumber } from './configured_bignumber';
import { Numberish } from './types';
/**
 * Convert a token unit amount to weis. E.g., 10.1 ETH -> 10100000000000000000.
 */
export declare function fromTokenUnitAmount(units: Numberish, decimals?: number): BigNumber;
/**
 * Convert a wei amount to token units. E.g., 10100000000000000000 -> 10.1 ETH.
 */
export declare function toTokenUnitAmount(weis: Numberish, decimals?: number): BigNumber;
//# sourceMappingURL=token_utils.d.ts.map