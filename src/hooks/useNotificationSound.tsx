import { useCallback } from "react";

export function useNotificationSound() {
  const playNotificationSound = useCallback(() => {
    const audio = new Audio("../../sounds/tap-notification.mp3");
    audio
      .play()
      .then(() => console.log("Sound played successfully"))
      .catch((error) => {
        console.error("Error playing sound:", error);
        console.log("Audio src:", audio.src);
        console.log("Audio ready state:", audio.readyState);
      });
  }, []);

  return playNotificationSound;
}
