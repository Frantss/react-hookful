/** Generic asynchronous function
 * @public
 */
export type AsyncFunction<T> = (...args: any[]) => Promise<T>;
