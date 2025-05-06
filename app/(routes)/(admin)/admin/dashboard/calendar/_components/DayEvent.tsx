import { ResponsiveDialog } from "@/components/responsive-dialog";
import { formateDateV1 } from "@/lib/utils";
import {
  Dispatch,
  SetStateAction,
  useActionState,
  startTransition,
} from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createCalendarEventAction } from "@/app/actions/calendarEvent";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";
import EventList from "./EventList";

function DayEvent({
  date,
  isOpen,
  setIsOpen,
  refreshCalendarAction,
}: {
  date: string;
  isOpen: boolean;
  refreshCalendarAction: () => void;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [state, action, isPending] = useActionState(
    async (_: any, formData: FormData) => {
      const event_name = formData.get("event_name") as string;
      return await createCalendarEventAction({
        date,
        event_name,
      }).then(() => {
        startTransition(() => {
          refreshCalendarAction();
        });
        toast.success("New event added.");
        setIsOpen(false);
      });
    },
    null
  );

  return (
    <div>
      <ResponsiveDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={`Manage Events for ${formateDateV1(date)}`}
      >
        <form action={action}>
          <div className="flex gap-2">
            <Input name="event_name" required placeholder="Event name" />
            <Button disabled={isPending}>
              {isPending && <Loader className="animate-spin" />}
              ADD
            </Button>
          </div>
        </form>
        <EventList refreshCalendarAction={refreshCalendarAction} date={date} />
      </ResponsiveDialog>
    </div>
  );
}

export default DayEvent;
