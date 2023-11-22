import { useState, useEffect } from "react";

export const useTimeInSeconds = () => {
  const [timeInSeconds, setTimeInSeconds] = useState(
    new Date().getTime() / 1000
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeInSeconds(Math.round(new Date().getTime() / 1000));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return timeInSeconds;
};

export default useTimeInSeconds;
