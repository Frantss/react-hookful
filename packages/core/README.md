# <h1 align="center">@react-hookful/core</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/@react-hookful/core">
    <img alt="npm (scoped)" src="https://img.shields.io/npm/v/@react-hookful/core?style=flat-square&logo=npm">
  </a>

  <img alt="npm bundle size (scoped)" src="https://img.shields.io/bundlephobia/minzip/@react-hookful/core?style=flat-square">

  <img alt="Codecov branch" src="https://img.shields.io/codecov/c/github/frantss/react-hookful/master?logo=codecov&style=flat-square&token=e30335a5a6a3484d9055b1e319ccc029&flag=core">

  <img alt="NPM" src="https://img.shields.io/npm/l/@react-hookful/core?style=flat-square">

  <img alt="npm" src="https://img.shields.io/npm/dm/@react-hookful/core?style=flat-square">

  <img alt="CircleCI" src="https://img.shields.io/circleci/build/github/Frantss/react-hookful/master?label=master&logo=circleci&style=flat-square&token=c97c78f1040c038c4857e8bbc6ab5a4acc310455">

  <img alt="CircleCI" src="https://img.shields.io/circleci/build/github/Frantss/react-hookful/develop?label=develop&logo=circleci&style=flat-square&token=c97c78f1040c038c4857e8bbc6ab5a4acc310455">
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
yarn add @react-hookful/core
```

## Hooks

- [useEffectOnce](#useeffectonce) - A semantic replacement for `useEffect` with
  an empty dependencies array
- [useFreezedCallback](#usefreezedcallback) - Returns a constant version of the function passed as argument
- [useObject](#useObject) - Like `useState` but for objects, with state built-in merging
- [useArray](#useArray) - Like `useState` but for arrays, with built-in useful setters
- [useToggle](#usetoggle) - Returns a boolean value with toggler and setters
- [useCounter](#usecounter) - Returns a numeric value with useful setters.
- [useConstantValue](#useconstantvalue) - Keeps a constant value through re-renders

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
useFreezedCallback<T extends GenericFunction<T>>(callback: T): T
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

### useObject

```tsx
useObject<T extends object>(initialState: T): [T, StateObjectSetter<T>]
```

Hook for creating an object with several setters for ease of use. Like state merging and resetting.

#### `StateObjectSetter` interface

- `merge: <T>(arg: Partial<T>) => void` - Merges the current state with the `arg` object.
- `set: (arg: T | ((currState: T) => T)) => void` - State setter, the same you would get with `React.useState`.
- `reset: () => void` - Resets the state back to the initial one.

#### Example

```jsx
import { useObject } from '@react-hookful/core';

const Component = () => {
  const [state, setState] = useObject({ username: 'arumba', password: '123' });

  setState.merge({ username: 'fernir' });
  console.log(state); // {username: 'fernir', password: '123'}

  setState.set({ username: 'something', password: 'password' });
  console.log(state); // {username: 'something', password: 'password'}

  setState.set(currState => ({ ...currState, username: 'sofi' })); // Same as `.merge`
  console.log(state); // {username: 'sofi', password: 'password'}

  setState.reset();
  console.log(state); // { username: 'arumba', password: '123' }

};
```

### useArray

```tsx
useArray<T>(initialState: T[] | (() => T[])): [T[], ArraySetter<T>]
```

Hook for creating an array with several setters for ease of use.

#### `ArraySetter` interface

  `set` - Sets the state, the same you would get with `React.useState`;
  `append: (element: T) => void` - Appends an element to the state
  `prepend: (element: T) => void` - Prepends an element to the state
  `pop: () => T` - Removes and returns the last element from the state
  `shift: () => T` - Removes and returns the first element from the state 
  `concat: (elements: T[]) => void` - Concatenates a given array to the state;
  `transform` - Allows you to transform each element of the state, with the same API as `Array.prototype.map`
  `filter` - Like `Array.prototype.filter`
  `reset: () => void` - Resets the state back to the initial value
  `clear: () => void` - Sets the state to `[]`

### useToggle

```tsx
useToggle(initialValue: boolean | (() => boolean)): [boolean, TogglerSetter]
```

Hook that stores a boolean value, and provides logic for toggling and setting the value.

The return value is a tuple with the value, toggler, and a object with the `true` and `false` setters.

#### `TogglerSetter` interface

- `toggle: () => void` - Toggles the boolean value to its opposite.
- `set: (arg: boolean | () => boolean) => void` - Setter similar to that of `useState`
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

  setIsLoading.set(true);
  console.log(isLoading); // true
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

  setValue.inc();
  console.log(value); // 96

  setValue.reset();
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

  console.log(getValue()); // my_value
  console.log(getValueFromResolver()); // 'my_value_from_resolver'
};
```

## Packages

For more hooks check one of the other sibling packages.

| Package                                                                  | Version                                                               |
| ------------------------------------------------------------------------ | --------------------------------------------------------------------- |
| [dom](https://github.com/Frantss/react-hookful/tree/master/packages/dom) | ![npm](https://img.shields.io/npm/v/@react-hookful/dom?style=plastic) |
