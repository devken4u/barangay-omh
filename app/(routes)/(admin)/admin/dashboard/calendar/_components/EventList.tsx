import { startTransition, useActionState, useEffect } from "react";
import { getCalendarDayEventsAction } from "@/app/actions/calendarEvent";
import EventItem from "./EventItem";
import { Loader } from "lucide-react";

function EventList({
  date,
  refreshCalendarAction,
}: {
  date: string;
  refreshCalendarAction: () => void;
}) {
  const [state, action, isPending] = useActionState(async () => {
    const events = await getCalendarDayEventsAction({
      date,
    });
    startTransition(() => {
      refreshCalendarAction();
    });
    return events;
  }, null);

  useEffect(() => {
    startTransition(() => {
      action();
    });
  }, []);

  return (
    <div className="space-y-2">
      {isPending && <Loader className="animate-spin" />}
      {state &&
        state.map((event) => {
          return (
            <EventItem eventListUpdate={action} event={event} key={event._id} />
          );
        })}
    </div>
  );
}

export default EventList;
