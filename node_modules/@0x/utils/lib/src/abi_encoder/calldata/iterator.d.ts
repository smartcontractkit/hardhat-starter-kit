import { Queue } from '../utils/queue';
import { CalldataBlock } from './calldata_block';
/**
 * Iterator class for Calldata Blocks. Blocks follows the order
 * they should be put into calldata that is passed to he EVM.
 *
 * Example #1:
 * Let root = Set {
 *                  Blob{} A,
 *                  Pointer {
 *                      Blob{} a
 *                  } B,
 *                  Blob{} C
 *            }
 * It will iterate as follows: [A, B, C, B.a]
 *
 * Example #2:
 * Let root = Set {
 *                  Blob{} A,
 *                  Pointer {
 *                      Blob{} a
 *                      Pointer {
 *                          Blob{} b
 *                      }
 *                  } B,
 *                  Pointer {
 *                      Blob{} c
 *                  } C
 *            }
 * It will iterate as follows: [A, B, C, B.a, B.b, C.c]
 */
declare abstract class BaseIterator implements Iterable<CalldataBlock> {
    protected readonly _root: CalldataBlock;
    protected readonly _queue: Queue<CalldataBlock>;
    private static _createQueue;
    constructor(root: CalldataBlock);
    [Symbol.iterator](): {
        next: () => IteratorResult<CalldataBlock>;
    };
    abstract nextBlock(): CalldataBlock | undefined;
}
export declare class CalldataIterator extends BaseIterator {
    constructor(root: CalldataBlock);
    nextBlock(): CalldataBlock | undefined;
}
export declare class ReverseCalldataIterator extends BaseIterator {
    constructor(root: CalldataBlock);
    nextBlock(): CalldataBlock | undefined;
}
export {};
//# sourceMappingURL=iterator.d.ts.map