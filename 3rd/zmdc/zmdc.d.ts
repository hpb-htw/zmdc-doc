import type { Example, Formatter } from "./types.js";
export declare const JS_EXAMPLE_EL_QUERY = "code[class*=\"example-javascript\"]";
export declare const HTML_EXAMPLE_EL_QUERY = "code[class*=\"example-html\"]";
/**
 * escape HTML specific character.
 * @param text text to insert into HTML
 * @return escaped text
 * */
export declare const htmlEscape: (text: string) => string;
/**
 * recognize demo functions and parse them to an Array of Example {@see Example}.
 * A function is recognized as an example, if its declaration begins with `export function demo`.
 * For example:
 * ```
 * export function demoFancyImageProcessing(img) {
 *      // tag: demo-1
 *      const metadata = auxiliaryFunction(img);
 *      const fancyImage = doSomeFancyStuff(img, metadata);
 *      // <div id="result">
 *      document.getElementById("result").innerHTML = `<img src="${fancyImage}" alt="">`;
 * }
 * ```
 * @param code example code
 * @return Example[]
 * */
export declare function parseExampleFunctions(code: string): Example[];
/**
 * show an Example in a DOM
 * @param example the example, which is the result of {@see #parseCode} by parsing an example function.
 * @param fmt a formatter. The default formatter just escapes HTML specific character.
 *
 * */
export declare function showExampleCode(example: Example, fmt?: Formatter): void;
export declare function parseCode(functionLines: string[]): Example;
//# sourceMappingURL=zmdc.d.ts.map