import {useEffect, useState} from "react";

export function useDelay(delay: number): boolean {
  const [isShown, setIsShown] = useState(false);
  useEffect(() => {
    const timer = window.setTimeout(
      () => setIsShown(() => true),
      delay
    );
    return () => {
      window.clearTimeout(timer);
    }
  }, [isShown, delay])
  return isShown;
}