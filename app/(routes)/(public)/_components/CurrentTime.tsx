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

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Manila",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }).format(date);
  };

  return (
    <div className="text-center p-4 text-lg text-background">
      <span className="font-bold">Philippines Time: </span>
      <span className="underline">
        {time ? formatTime(time) : "Loading..."}
      </span>
    </div>
  );
}
