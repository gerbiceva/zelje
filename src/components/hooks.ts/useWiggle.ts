import { useState, useEffect } from "react";

const useWiggleAnimation = () => {
  const [isWiggling, setWiggling] = useState(true);

  const wiggleElement = () => {
    setWiggling(true);
  };

  // useEffect(() => {
  //   if (isWiggling) {
  //     // Reset the Wiggling state after the animation duration
  //     const animationDuration = 300; // milliseconds (adjust as needed)
  //     const timeoutId = setTimeout(() => {
  //       setWiggling(false);
  //     }, animationDuration);

  //     return () => clearTimeout(timeoutId);
  //   }
  // }, [isWiggling]);

  const wiggleStyle = isWiggling
    ? {
        animation: "wiggleAnimation 1s linear 0s infinite",
      }
    : {};

  return { wiggleStyle, wiggleElement };
};

export default useWiggleAnimation;
