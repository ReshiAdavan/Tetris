import { useEffect, useRef } from "react";

export function useInterval(callback, delay) {
  const callBack = useRef();
  useEffect(() => {
    callBack.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      callBack.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => {
        clearInterval(id);
      };
    }
  }, [delay]);
}
