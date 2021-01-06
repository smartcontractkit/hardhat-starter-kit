import { Options as CSSSelectOptions } from "css-select";
import type { Element, Node } from "domhandler";
export declare type Options = CSSSelectOptions<Node, Element>;
export declare function filter(selector: string, elements: Element[], options?: Options): Element[];
export declare function select(selector: string, root: Element | Element[], options?: Options): Element[];
//# sourceMappingURL=index.d.ts.map