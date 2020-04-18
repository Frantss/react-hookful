/* eslint-disable @typescript-eslint/no-throw-literal */
import { renderHook, act } from '@testing-library/react-hooks';
import { useStorage } from '../src/useStorage';

const key = 'test';
const expected = { arumba: 'arumba', fernir: 'fernir' };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parser = JSON.parse as (arg?: string | null) => any;
const serializer = JSON.stringify;
const serializedExpected = serializer(expected);

describe('useStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('uses the default value', () => {
    const { result } = renderHook(() => useStorage(key, expected));
    expect(result.current.get()).toStrictEqual(expected);
    expect(parser(localStorage.getItem(key))).toStrictEqual(expected);
  });

  it('', () => {});

  it('handles null values', () => {
    const { result } = renderHook(() => useStorage(key));
    expect(result.current.get()).toBeNull();
    expect(parser(localStorage.getItem(key))).toBeNull();
  });

  it('sets the value correctly', () => {
    const { result } = renderHook(() => useStorage(key));

    act(() => {
      const success = result.current.set(expected);
      expect(success).toBeTruthy();
    });

    expect(result.current.get()).toStrictEqual(expected);
    expect(parser(localStorage.getItem(key))).toStrictEqual(expected);
  });

  it('value updates when changes externally', () => {
    const { result } = renderHook(() => useStorage(key));
    localStorage.setItem(key, serializedExpected);
    expect(result.current.get()).toStrictEqual(expected);
  });

  it('uses the correct store', () => {
    renderHook(() => useStorage(key, expected, { storage: sessionStorage }));
    expect(localStorage.getItem(key)).toBeNull();
    expect(parser(sessionStorage.getItem(key))).toStrictEqual(expected);
  });

  it('uses existing value when override option is false', () => {
    localStorage.setItem(key, serializedExpected);
    const { result } = renderHook(() => useStorage(key, 'newDefault'));
    expect(result.current.get()).toStrictEqual(expected);
  });

  it('handles store errors while setting the default value', () => {
    jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw 'error';
    });

    const { result } = renderHook(() => useStorage(key, expected));
    expect(result.current.error).toBe('error');
  });

  it('handles store errors while setting the default value', () => {
    localStorage.setItem(key, 'notExpected');
    jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw 'error';
    });

    const { result } = renderHook(() => useStorage(key));
    const success = result.current.set('notExpected');
    expect(success).toBeFalsy();
    expect(result.current.error).toBe('error');
  });
});
