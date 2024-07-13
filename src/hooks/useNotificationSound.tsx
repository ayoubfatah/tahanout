import { useCallback } from "react";

export function useNotificationSound() {
  const playNotificationSound = useCallback(() => {
    const audio = new Audio("../../sounds/tap-notification.mp3");
    audio
      .play()
      .then(() => {})
      .catch((error) => {
        console.error("Error playing sound:", error);
      });
  }, []);

  return playNotificationSound;
}
