/** Function with generic parameters and return value
 * @public
 */
export type GenericFunction<T> = (...args: any[]) => T;

/** Generic asynchronous function
 * @public
 */
export type AsyncFunction<T> = (...args: any[]) => Promise<T>;
