# <h1 align="center">@react-hookful/core</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/@react-hookful/core">
    <img alt="npm (scoped)" src="https://img.shields.io/npm/v/@react-hookful/core?style=plastic">
  </a>

  <img alt="npm bundle size (scoped)" src="https://img.shields.io/bundlephobia/minzip/@react-hookful/core?style=plastic">
</p>

Useful react hooks that help you clean up you functional components.

## Contents

- [Installation](#installation)
- [Hooks](#hooks)
- [Packages](#packages)

## Installation

```shell
# NPM
npm install @react-hookful/core

# Yarn
yarn install @react-hookful/core
```

## Hooks

- [useAsyncFunction](#useasyncfunction) - Runs an async function and keeps track of its result, status, and error
- [useEffectOnce](#useeffectonce) - A semantic replacement for `useEffect` with
  an empty dependencies array
- [useFreezedCallback](#usefreezedcallback) - Returns a constant version of the function passed as argument
- [useStateObject](#usestateobject) - Like `useState` but for objects, with state built-in merging
- [useToggle](#usetoggle) - Returns a boolean value with toggler and setters
- [useCounter](#usecounter) - Returns a numeric value with useful setters.
- [useConstantValue](#useconstantvalue) - Keeps a constant value through re-renders

### useAsyncFunction

```tsx
useAsyncFunction<T>(asyncFn: AsyncFunction<T>, args: unknown[] = [], dependencies: unknown[] = []): AsyncFunctionState<T>
```

Hook for running side effects and monitor their current state.

`loading` flag is initialized to `true` and changes to `false` once `asyncFn` has been resolved.

#### `AsyncFunctionState<T>` interface

- data: T - The result of the async function passed as an argument.
- loading: boolean - Indicates whether the async function is still running.
- error: unknown - In case an error occurs while executing the function it is stored in this value.

#### Example

```jsx
import { useAsyncFunction } from '@react-hookful/core';

const Component = () => {
  const { data, loading, error } = useAsyncFunction(() => {
    /* some asynchronous function */
  });

  const result = useAsyncFunction(/* some asynchronous function reference */);
};
```

### useEffectOnce

```tsx
useEffectOnce(effect: EffectCallback): void
```

This hook its a simple wrapper of `React.useEffect` with and empty dependencies array.
It is a way of clearly stating your intentions though semantics.

#### Example

```jsx
import { useEffectOnce } from '@react-hookful/core';

const Component = () => {
  useEffectOnce(() => {
    /* your side effects here */
  });
};
```

### useFreezedCallback

```tsx
useFreezedCallback<T>(callback: GenericFunction<T>): GenericFunction<T>]
```

Hook that freezed a given callback, so it is only created once in the components life.
It ensures the return function is always the same.

Useful for optimizations where otherwise constant functions are recalculated every re-render

Should the callback ever be recalculated see `React.useCallback` and `React.useMemo`.

#### Example

```jsx
import { useFreezedCallback } from '@react-hookful/core';

const Component = () => {
  const freezedCb = useFreezedCallback(() => {
    /* some function that doesn't need to be recalculated */
  });
};
```

### useStateObject

```tsx
useStateObject(initialState: object): [object, StateObjectSetter]
```

Hook for creating an object with several setters for ease of use. Like state merging and resetting.

#### `StateObjectSetter` interface

- `merge: (arg: object) => void` - Merges the current state with the `arg` object.
- `set: (arg: object | ((prevState: object) => object)) => void` - State setter, the same you would get with `React.useState`.
- `reset: () => void` - Resets the state back to the initial one.
- `clear: () => void` - Sets the state to an empty object (`{}`).

#### Example

```jsx
import { useStateObject } from '@react-hookful/core';

const Component = () => {
  const [state, setState] = useStateObject({ username: 'arumba' });

  setState.merge({ username: 'fernir', password: '123' });
  console.log(state); // {username: 'fernir', password: '123'}

  setState.set({ password: 'password' });
  console.log(state); // {username: 'fernir', password: 'password'}

  setState.set(prevState => ({ ...prevState, username: 'sofi' }));
  console.log(state); // {username: 'sofi', password: 'password'}

  setState.reset();
  console.log(state); // { username: 'arumba'}

  setState.clear();
  console.log(state); // {}
};
```

### useToggle

```tsx
useToggle(initialValue: boolean | (() => boolean)): [boolean, TogglerSetter]
```

Hook that stores a boolean value, and provides logic for toggling and setting the value.

The return value is a tuple with the value, toggler, and a object with the `true` and `false` setters.

#### `TogglerSetter` interface

- `toggle: () => void` - Toggles the boolean value to its opposite.
- `setTrue: () => void` - Sets the value to `true`.
- `setFalse: () => void` - Sets the value to `false`.

#### Example

```jsx
import { useToggle } from '@react-hooks/core';

const Component = () => {
  const [isLoading, setIsLoading] = useToggle(true);

  console.log(isLoading); // true

  setIsLoading.toggle();
  console.log(isLoading); // false

  setIsLoading.setTrue();
  console.log(isLoading); // true

  setIsLoading.setFalse();
  console.log(isLoading); // false
};
```

### `useCounter`

Simple hook to keep a numeric state with some useful setters.

#### `CounterSetter` interface

- `set(value: number | ((prev: number) => number)) => void` - Sets the state to a given value.
- `inc(value?: number) => void` - Increments the state by a given value. Defaults to `1`.
- `dec(value?: number) => void` - Decrements the state by a given value. Defaults to `1`.
- `reset() => void` - Resets the state back to its initial value.

#### Example

```jsx
import { useCounter } from '@react-hookful/core';

const Component = () => {
  [value, setValue] = useCounter(0);

  setValue.set(100);
  console.log(value); // 100

  setValue.inc(5);
  console.log(value); // 105

  setValue.dec(10);
  console.log(value); // 95

  setValue.reset(100);
  console.log(value); // 0
};
```

### useConstantValue

```tsx
useConstantValue<T>(value: T | (() => T)): (() => T)
```

Hook to keep a constant state value.
It takes an value or a resolver and maintains a reference to it though re-renders.

Returns a getter for state value so it can be lazily set.

`React.useState` can be used as an alternative although it should be less performing since it relies on reducers.

Should the value change based on dependencies consider `React.useMemo`.
Should the value be a reference to a function consider `useFreezedCallback`.

#### Example

```jsx
import { useConstantValue } from 'react-hookful';

const Component = () => {
  const getValue = useConstantValue('my_value');

  const getValueFromResolver = useConstantValue(() => 'my_value_from_resolver');

  const getExpensiveValue = useConstantValue(() => { /* some expensive computation that resolves the value and will run only once*/ });

  console.log(getValue(); // my_value
  console.log(getValueFromResolver()); // 'my_value_from_resolver'
};
```

## Packages

For more hooks check one of the other sibling packages.

| Package                                                                  | Version                                                               |
| ------------------------------------------------------------------------ | --------------------------------------------------------------------- |
| [dom](https://github.com/Frantss/react-hookful/tree/master/packages/dom) | ![npm](https://img.shields.io/npm/v/@react-hookful/dom?style=plastic) |
