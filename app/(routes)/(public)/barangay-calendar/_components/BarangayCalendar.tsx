"use client";

import { Calendar } from "rsuite";
import { useState, useEffect, startTransition, useActionState } from "react";
import { Dot } from "lucide-react";
import { getDaysWithCalendarEventAction } from "@/app/actions/calendarEvent";
import EventInDay from "./EventInDay";

function BarangayCalendar() {
  const [selectedDate, setSelectedDate] = useState<string | null>();
  const [state, action, isPending] = useActionState(async () => {
    const events = await getDaysWithCalendarEventAction();
    return events;
  }, null);

  useEffect(() => {
    startTransition(() => {
      action();
    });
  }, []);

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const formatted = `${year}-${month}-${day}`;
    setSelectedDate(formatted);
  }, []);

  return (
    <div>
      <Calendar
        bordered
        onChange={(date) => {
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const day = String(date.getDate()).padStart(2, "0");
          const formatted = `${year}-${month}-${day}`;
          setSelectedDate(formatted);
        }}
        renderCell={(date) => {
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const day = String(date.getDate()).padStart(2, "0");
          const formatted = `${year}-${month}-${day}`;
          return state?.includes(formatted) ? (
            <div className="text-red-500 flex justify-center font-bold">
              <Dot className="size-14" />
            </div>
          ) : null;
        }}
      />
      <EventInDay date={selectedDate!} />
    </div>
  );
}

export default BarangayCalendar;
