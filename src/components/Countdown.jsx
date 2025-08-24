import React, { useState, useEffect } from "react";

function TimeUnit({ value, label }) {
  const timeClass =
    "text-6xl md:text-9xl font-bold bg-gradient-to-t from-pink-500 to-blue-400 bg-clip-text text-transparent px-2 mt-4";
  const labelClass =
    "text-sm md:text-base font-medium bg-gradient-to-t from-pink-500 to-blue-400 bg-clip-text text-transparent px-2";

  return (
    <div className="text-center">
      <div className={timeClass}>{value.toString().padStart(2, "0")}</div>
      <div className={labelClass}>{label}</div>
    </div>
  );
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2025-09-14T00:00:00");

    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mb-8 px-6">
      <div className="flex justify-center space-x-4 md:space-x-8">
        <TimeUnit value={timeLeft.days} label="Days" />
        <TimeUnit value={timeLeft.hours} label="Hours" />
        <TimeUnit value={timeLeft.minutes} label="Minutes" />
        <TimeUnit value={timeLeft.seconds} label="Seconds" />
      </div>
      <p className="py-2 text-red-900 text-xl font-bold">
        September 14th, 2025
      </p>
    </div>
  );
}
