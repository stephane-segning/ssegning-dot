import { useEffect, useRef } from 'react';

type Fn = () => void;

export function useInterval(callback: Fn, delay: number) {
  const savedCallback = useRef<Fn>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current && savedCallback.current();
    }

    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
