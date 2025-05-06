import { formateDateV1 } from "@/lib/utils";
import { startTransition, useActionState, useEffect } from "react";
import { getCalendarDayEventsAction } from "@/app/actions/calendarEvent";
import { Loader } from "lucide-react";

function EventInDay({ date }: { date: string }) {
  const [state, action, isPending] = useActionState(async () => {
    const events = await getCalendarDayEventsAction({
      date,
    });
    return events;
  }, null);

  useEffect(() => {
    startTransition(() => {
      action();
    });
  }, [date]);

  return (
    <div className="border-2 border-primary p-4 rounded-md">
      <h1 className="text-xl font-bold">Event(s) in {formateDateV1(date)}</h1>
      <div className="space-y-2 mt-2">
        {!state || (state.length < 1 && "Empty")}
        {isPending && <Loader className="animate-spin" />}
        <ul className="list-disc pl-8">
          {state &&
            !isPending &&
            state.map((event) => {
              return <li key={event._id}>{event.event_name}</li>;
            })}
        </ul>
      </div>
    </div>
  );
}

export default EventInDay;
