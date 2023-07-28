// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
export function useDebounce(fn: (...args) => void , timeout = 200) {
  let timer: number;
  return function(this, ...args) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn(...args)
    }, timeout)

  }
}