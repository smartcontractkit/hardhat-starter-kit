import { EncodingRules } from '../utils/rules';
import { CalldataBlock } from './calldata_block';
export declare class Calldata {
    private readonly _rules;
    private _selector;
    private _root;
    constructor(rules: EncodingRules);
    /**
     * Sets the root calldata block. This block usually corresponds to a Method.
     */
    setRoot(block: CalldataBlock): void;
    /**
     * Sets the selector to be prepended onto the calldata.
     * If the root block was created by a Method then a selector will likely be set.
     */
    setSelector(selector: string): void;
    /**
     * Iterates through the calldata blocks, starting from the root block, to construct calldata as a hex string.
     * If the `optimize` flag is set then this calldata will be condensed, to save gas.
     * If the `annotate` flag is set then this will return human-readable calldata.
     * If the `annotate` flag is *not* set then this will return EVM-compatible calldata.
     */
    toString(): string;
    /**
     * There are three types of calldata blocks: Blob, Set and Pointer.
     * Scenarios arise where distinct pointers resolve to identical values.
     * We optimize by keeping only one such instance of the identical value, and redirecting all pointers here.
     * We keep the last such duplicate value because pointers can only be positive (they cannot point backwards).
     *
     * Example #1:
     *  function f(string[], string[])
     *  f(["foo", "bar", "blitz"], ["foo", "bar", "blitz"])
     *  The array ["foo", "bar", "blitz"] will only be included in the calldata once.
     *
     * Example #2:
     *  function f(string[], string)
     *  f(["foo", "bar", "blitz"], "foo")
     *  The string "foo" will only be included in the calldata once.
     *
     * Example #3:
     *  function f((string, uint, bytes), string, uint, bytes)
     *  f(("foo", 5, "0x05"), "foo", 5, "0x05")
     *  The string "foo" and bytes "0x05" will only be included in the calldata once.
     *  The duplicate `uint 5` values cannot be optimized out because they are static values (no pointer points to them).
     *
     * @TODO #1:
     *   This optimization strategy handles blocks that are exact duplicates of one another.
     *   But what if some block is a combination of two other blocks? Or a subset of another block?
     *   This optimization problem is not much different from the current implemetation.
     *   Instead of tracking "observed" hashes, at each node we would simply do pattern-matching on the calldata.
     *   This strategy would be applied after assigning offsets to the tree, rather than before (as in this strategy).
     *   Note that one consequence of this strategy is pointers may resolve to offsets that are not word-aligned.
     *   This shouldn't be a problem but further investigation should be done.
     *
     * @TODO #2:
     *   To be done as a follow-up to @TODO #1.
     *   Since we optimize from the bottom-up, we could be affecting the outcome of a later potential optimization.
     *   For example, what if by removing one duplicate value we miss out on optimizing another block higher in the tree.
     *   To handle this case, at each node we can store a candidate optimization in a priority queue (sorted by calldata size).
     *   At the end of traversing the tree, the candidate at the front of the queue will be the most optimal output.
     *
     */
    private _optimize;
    private _toEvmCompatibeCallDataHex;
    /**
     * Returns human-readable calldata.
     *
     * Example:
     *   simpleFunction(string[], string[])
     *   strings = ["Hello", "World"]
     *   simpleFunction(strings, strings)
     *
     * Output:
     *   0xbb4f12e3
     *                                                                                      ### simpleFunction
     *   0x0       0000000000000000000000000000000000000000000000000000000000000040              ptr<array1> (alias for array2)
     *   0x20      0000000000000000000000000000000000000000000000000000000000000040              ptr<array2>
     *
     *   0x40      0000000000000000000000000000000000000000000000000000000000000002          ### array2
     *   0x60      0000000000000000000000000000000000000000000000000000000000000040              ptr<array2[0]>
     *   0x80      0000000000000000000000000000000000000000000000000000000000000080              ptr<array2[1]>
     *   0xa0      0000000000000000000000000000000000000000000000000000000000000005              array2[0]
     *   0xc0      48656c6c6f000000000000000000000000000000000000000000000000000000
     *   0xe0      0000000000000000000000000000000000000000000000000000000000000005              array2[1]
     *   0x100     576f726c64000000000000000000000000000000000000000000000000000000
     */
    private _toHumanReadableCallData;
}
//# sourceMappingURL=calldata.d.ts.map