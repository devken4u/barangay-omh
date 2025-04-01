"use client";

import { useState, useEffect } from "react";

export default function CurrentTime() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center p-4 text-lg text-background">
      <span className="font-bold">Philippines Time: </span>
      <span>{time ? time.toLocaleTimeString() : "Loading..."}</span>
    </div>
  );
}
