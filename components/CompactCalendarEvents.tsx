"use client";

import { useActionState, startTransition, useEffect } from "react";
import { getCalendarEventsByYearAction } from "@/app/actions/calendarEvent";
import { formateDateV1 } from "@/lib/utils";
import { Loader } from "lucide-react";

function CompactCalendarEvents({ year }: { year: string }) {
  const [state, action, isPending] = useActionState(async () => {
    const events = await getCalendarEventsByYearAction(year);
    return events;
  }, null);

  useEffect(() => {
    startTransition(() => {
      action();
    });
  }, [year]);

  return (
    <div className="space-y-4 mt-8">
      {isPending && <Loader className="animate-spin" />}
      {state &&
        state?.length > 0 &&
        !isPending &&
        state?.map((event) => {
          return (
            <div className="border-b-2 border-black" key={event._id}>
              <h1 className="text-lg font-bold">{formateDateV1(event.date)}</h1>
              <p className="pl-4 pb-2">{event.event_name}</p>
            </div>
          );
        })}
    </div>
  );
}

export default CompactCalendarEvents;
