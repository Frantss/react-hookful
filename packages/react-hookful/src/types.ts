/** A function with generic parameters and return value */
export type GenericFunction = (...args: unknown[]) => unknown;

/** Function that has no return value */
export type VoidFunction = () => void;

/** Generic asynchronous function */
export type AsyncFunction<T> = (...args: unknown[]) => Promise<T>;
