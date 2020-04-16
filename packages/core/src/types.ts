/** A function with generic parameters and return value */
export type GenericFunction<T> = (...args: any[]) => T;

/** Generic asynchronous function */
export type AsyncFunction<T> = (...args: any[]) => Promise<T>;
