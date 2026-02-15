import { useEffect, useState } from "react";

export default function Timer({ onExpire }) {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const expiresAt = parseInt(localStorage.getItem("expiresAt") || "0", 10);

    const update = () => {
      const now = Date.now();
      const diff = Math.floor((expiresAt - now) / 1000);
      if (diff <= 0) {
        setTimeLeft(0);
        onExpire();
      } else {
        setTimeLeft(diff);
      }
    };

    update();
    const interval = setInterval(update, 250);
    return () => clearInterval(interval);
  }, [onExpire]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = String(timeLeft % 60).padStart(2, "0");

  return <h2>Time Left: {minutes}:{seconds}</h2>;
}
