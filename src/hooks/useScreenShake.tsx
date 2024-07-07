// hooks/useScreenShake.ts
import { useCallback } from "react";

export function useScreenShake() {
  const shakeScreen = useCallback(() => {
    document.body.classList.add("shake");
    setTimeout(() => {
      document.body.classList.remove("shake");
    }, 500); // Remove the class after 500ms
  }, []);

  return shakeScreen;
}
