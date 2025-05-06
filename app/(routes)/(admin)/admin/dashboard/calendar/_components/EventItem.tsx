import { CalendarEvent } from "@/types";
import { Button } from "@/components/ui/button";
import { Loader, Trash2 } from "lucide-react";
import { useActionState, startTransition } from "react";
import { deleteCalendarEventAction } from "@/app/actions/calendarEvent";
import toast from "react-hot-toast";

function EventItem({
  event,
  eventListUpdate,
}: {
  event: CalendarEvent;
  eventListUpdate: () => void;
}) {
  const [state, action, isPending] = useActionState(async () => {
    return await deleteCalendarEventAction(event._id).then(() => {
      startTransition(() => {
        eventListUpdate();
      });
      toast.success("Event deleted.");
    });
  }, null);

  return (
    <div className="flex">
      <p className="grow">{event.event_name}</p>
      <Button
        disabled={isPending}
        onClick={() => {
          startTransition(() => {
            action();
          });
        }}
        variant="destructive"
        size="sm"
      >
        {isPending && <Loader className="animate-spin" />}
        <Trash2 />
      </Button>
    </div>
  );
}

export default EventItem;
