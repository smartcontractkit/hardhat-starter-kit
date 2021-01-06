import { Transaction as TransactionType, TransactionContext } from '@sentry/types';
/**
 * Default function implementing pageload and navigation transactions
 */
export declare function defaultRoutingInstrumentation<T extends TransactionType>(startTransaction: (context: TransactionContext) => T | undefined, startTransactionOnPageLoad?: boolean, startTransactionOnLocationChange?: boolean): void;
//# sourceMappingURL=router.d.ts.map