import { useEffect, useState } from "react";

const useCountUp = (endValue: number, duration = 2000) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = endValue / (duration / 10);
    const stepTime = Math.abs(Math.floor(duration / endValue));

    const timer = setInterval(() => {
      start += increment;
      if (start >= endValue) {
        clearInterval(timer);
        start = endValue;
      }
      setValue(Math.ceil(start));
    }, stepTime);

    return () => clearInterval(timer);
  }, [endValue, duration]);

  return value;
};

export default useCountUp;
