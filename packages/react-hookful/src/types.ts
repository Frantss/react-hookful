/** A function with generic parameters and return value */
export type GenericFunction<T> = (...args: any[]) => T;

/** Function that has no return value */
export type VoidFunction = () => void;

/** Generic asynchronous function */
export type AsyncFunction<T> = (...args: any[]) => Promise<T>;
