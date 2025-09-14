import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
  type Mock,
} from "vitest";
import { memoize } from "./memo";

describe("memoize", () => {
  let func: Mock<(x: number) => number>;

  beforeEach(() => {
    func = vi.fn((x: number) => x * 3);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should return correct result from original function", () => {
    const memoizedFunc = memoize(func);
    const result = memoizedFunc(2);

    expect(result).toBe(6);
  });

  it("should call original function only once for the same argument", () => {
    const memoizedFunc = memoize(func);
    memoizedFunc(2);
    memoizedFunc(2);
    memoizedFunc(2);

    expect(func).toHaveBeenCalledTimes(1);
  });

  it("should call original function again for different argument", () => {
    const memoizedFunc = memoize(func);
    memoizedFunc(2);
    memoizedFunc(3);
    memoizedFunc(4);

    expect(func).toHaveBeenCalledTimes(3);
  });

  it("should return correct results for different arguments", () => {
    const memoizedFunc = memoize(func);
    const result1 = memoizedFunc(2);
    const result2 = memoizedFunc(3);
    const result3 = memoizedFunc(2);

    expect(result1).toBe(6);
    expect(result2).toBe(9);
    expect(result3).toBe(6);
  });

  describe("when using object arguments", () => {
    it("should not recall function if the same object reference is passed", () => {
      const objFunc = vi.fn((obj: { id: number }) => obj.id * 2);
      const memoizedFn = memoize(objFunc);
      const myObject = { id: 10 };

      memoizedFn(myObject);
      memoizedFn(myObject);

      expect(objFunc).toHaveBeenCalledTimes(1);
    });

    it("should recall function if new object with same content is passed", () => {
      const objFunc = vi.fn((obj: { id: number }) => obj.id * 2);
      const memoizedFn = memoize(objFunc);

      memoizedFn({ id: 10 });
      memoizedFn({ id: 10 });

      expect(objFunc).toHaveBeenCalledTimes(2);
    });
  });
});
