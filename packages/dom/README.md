# <h1 align="center">@react-hookful/dom</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/@react-hookful/dom">
    <img alt="npm (scoped)" src="https://img.shields.io/npm/v/@react-hookful/dom?style=plastic">
  </a>

  <img alt="npm bundle size (scoped)" src="https://img.shields.io/bundlephobia/minzip/@react-hookful/dom?style=plastic">
</p>

Useful react DOM-related hooks that help you clean up you functional components.

## Contents

- [Installation](#installation)
- [Hooks](#hooks)
- [Packages](#packages)

## Installation

```shell
# NPM
npm install @react-hookful/dom

# Yarn
yarn install @react-hookful/dom
```

## Hooks

- [useLocalStorage](#uselocalstorage-and-usesessionstorage) - Provides a hook API to access and manipulate the local storage.
- [useSessionStorage](#uselocalstorage-and-usesessionstorage) - Like `useLocalStorage` but for the session storage.

### `useLocalStorage` and `useSessionStorage`

```tsx
useLocalStorage<T>(key: string, defaultValue?: T, options?: StorageOptions<T>): StorageValue<T>
```

Allows you to store and retrieve data to the local store through a hook API.

It takes the key to work with in the store, a optional default value that gets set every time the store lacks a value for the given key.

It also takes some advanced options that are specified in [here](#storageoptionst-interface).

`useSessionStorage` works the same way this hook does.

#### Example

```jsx
import { useLocalStorage } from '@react-hookful/dom';

const Component = () => {
  const userOptions = useLocalStorage('user_options', { theme: 'dark', id: 234 });

  userOptions.get(); // {theme: 'dark', id: 234}

  const success = userOptions.set({ ...userOptions.get(), theme: light });

  console.log(success); // true - Indicates if the store throws an error

  userOptions.get(); // {theme: 'light', id: 234}
};
```

#### `StorageOptions<T>` interface

- `override?: boolean` - Indicates whether to override the current storage value with the `defaultValue` param. Defaults to `false`.
- `parser?: (arg: string | null) => T | null` - The function used to parse the value coming from the store. Defaults to `JSON.parse`
- `serializer?: (arg: T | null) => string` - The function that serializes the given value to string. Defaults to `JSON.stringify`.

#### `StorageValue<T>` interface

- `get: () => T | null` - Retrieves and returns the value from the store.
- `set: (value: T | null) => boolean` - Sets the given value to the store. Returns `false` in case of a store error.
- `error?: DOMException` - If something goes wrong while setting a value the error gets dump in this field.

## Packages

For more hooks check one of the other sibling packages.

| Package                                                                    | Version                                                                |
| -------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| [core](https://github.com/Frantss/react-hookful/tree/master/packages/core) | ![npm](https://img.shields.io/npm/v/@react-hookful/core?style=plastic) |
