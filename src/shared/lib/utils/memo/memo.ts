/**
 * Simple memoization function that caches the result of a function based on its last argument.
 * @param func The function to memoize.
 * @returns A memoized version of the input function.
 */
export function memoize<A, R>(func: (arg: A) => R): (arg: A) => R {
  // Variables to store the last argument and the last result
  let lastArg: A;
  let lastResult: R;

  return function (arg: A) {
    // If the argument is the same as the last one, return the cached result
    if (arg === lastArg) {
      return lastResult;
    }
    // Otherwise, call the function and cache the result
    lastArg = arg;
    lastResult = func(arg);
    return lastResult;
  };
}
