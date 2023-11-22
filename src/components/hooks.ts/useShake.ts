import { useState, useEffect } from "react";

const useShakeAnimation = () => {
  const [isShaking, setShaking] = useState(false);

  const shakeElement = () => {
    setShaking(true);
  };

  useEffect(() => {
    if (isShaking) {
      // Reset the shaking state after the animation duration
      const animationDuration = 300; // milliseconds (adjust as needed)
      const timeoutId = setTimeout(() => {
        setShaking(false);
      }, animationDuration);

      return () => clearTimeout(timeoutId);
    }
  }, [isShaking]);

  const shakeStyle = isShaking
    ? {
        animation: "shakeAnimation 0.2s ease-in-out",
      }
    : {};

  return { shakeStyle, shakeElement };
};

export default useShakeAnimation;
