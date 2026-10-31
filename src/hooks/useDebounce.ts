import { useRef } from "react";

export function useDebounce<Args extends unknown[]>(
  fn: (...args: Args) => void,
  timeout = 200
) {
  const timer = useRef<number>(undefined);
  return (...args: Args) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => fn(...args), timeout);
  };
}
