import { renderHook } from '@testing-library/react-hooks';
import useAsyncFunction from '../src/useAsyncFunction';

describe('useAsyncFunction', () => {
  it('calls the async function', async () => {
    const asyncFn = jest.fn(() => Promise.resolve(0));

    const { waitForNextUpdate } = renderHook(() => useAsyncFunction(asyncFn));

    await waitForNextUpdate();
    expect(asyncFn).toBeCalledTimes(1);
  });

  it('correctly resolves async function', async () => {
    const asyncFn = jest.fn(() => Promise.resolve(0));

    const { result, waitForNextUpdate } = renderHook(() => useAsyncFunction(asyncFn));

    await waitForNextUpdate();
    expect(result.current.data).toBe(0);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('correctly rejects async function', async () => {
    const asyncFn = jest.fn(() => Promise.reject(0));

    const { result, waitForNextUpdate } = renderHook(() => useAsyncFunction(asyncFn));

    await waitForNextUpdate();
    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(0);
  });

  it('correctly changes loading status', async () => {
    const asyncFn = jest.fn(() => Promise.resolve(0));

    const { result, waitForNextUpdate } = renderHook(() => useAsyncFunction(asyncFn));

    expect(result.current.loading).toBe(true);
    await waitForNextUpdate();
    expect(result.current.loading).toBe(false);
  });

  it('calls the async function with the given parameters', async () => {
    const asyncFn = jest.fn(arg => Promise.resolve(arg));
    const argument = 0;

    const { result, waitForNextUpdate } = renderHook(() => useAsyncFunction(asyncFn, [argument]));

    await waitForNextUpdate();
    expect(asyncFn).toBeCalledWith(argument);
    expect(result.current.data).toBe(argument);
  });

  it('recalls the async function when dependecies array change', async () => {
    const asyncFn = jest.fn(arg => Promise.resolve(arg));
    let argument = 0;

    const { result, waitForNextUpdate, rerender } = renderHook(() =>
      useAsyncFunction(asyncFn, [argument], [argument]),
    );

    await waitForNextUpdate();
    expect(asyncFn).toBeCalledTimes(1);
    expect(asyncFn).toBeCalledWith(argument);
    expect(result.current.data).toBe(argument);

    argument = 1;
    rerender();
    await waitForNextUpdate();
    expect(asyncFn).toBeCalledTimes(2);
    expect(asyncFn).toBeCalledWith(argument);
    expect(result.current.data).toBe(argument);
  });
});
