/** @internal */
export const isFunction = (value: unknown): value is Function => typeof value === 'function';

/** @internal */
export const resolveValue = <T>(value: T | (() => T)): T => (isFunction(value) ? value() : value);
