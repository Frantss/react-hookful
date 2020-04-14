# react-hookful

![npm](https://img.shields.io/npm/v/react-hookful?style=plastic)
![npm bundle size](https://img.shields.io/bundlephobia/min/react-hookful?style=plastic)

Useful react hooks that help you clean up you functional components.

## Contents

- [Installation](#Installation)
- [Hooks](#Hooks)
- [License](#License)

## Installation

```shell
# NPM
npm install react-hookful

# Yarn
yarn install react-hookful
```

## Hooks

- [useAsyncFunction](#useAsyncFunction) - Runs an async function and keeps track of its result, status, and error
- [useEffectOnce](#useEffectOnce) - A semantic replacement for `useEffect` with an empty dependencies array
- [useFreezedCallback](#useFreezedCallback) - Returns a constant version of the function passed as argument
- [useStateObject](#useStateObject) - Like `useState` but for objects, with state built-in merging
- [useToggle](#useToggle) - Returns a boolean value with toggler and setters

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
import { useAsyncFunction } from 'react-hookful';

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
import { useEffectOnce } from 'react-hookful';

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
import { useFreezedCallback } from 'react-hookful';

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

- merge: (arg: object) => void - Merges the current state with the `arg` object.
- set: (arg: object | ((prevState: object) => object)) => void - State setter, the same you would get with `React.useState`.
- reset: () => void - Resets the state back to the initial one.
- clear: () => void - Sets the state to an empty object (`{}`).

#### Example

```jsx
import { useStateObject } from 'react-hookful';

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
- `setTrue: () => void` - Sets the value to true.
- `setFalse: () => void` - Sets the value to false.

#### Example

```jsx
import { useToggle } from 'react-hooks';

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
