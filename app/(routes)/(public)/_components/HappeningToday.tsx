import { getCalendarDayEvents } from "@/db/calendarEvent/calendarEvent";
import { formateDateV1 } from "@/lib/utils";
import { CalendarEvent } from "@/types";

async function HappeningToday() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const formatted = `${year}-${month}-${day}`;
  const events: CalendarEvent[] = await getCalendarDayEvents(formatted);
  const data: CalendarEvent[] = JSON.parse(JSON.stringify(events));
  return (
    <div className="border border-primary rounded-md mb-4">
      <h1 className="text-3xl font-bold text-center bg-primary text-background py-2">
        What's up today?
      </h1>
      {data.length > 0 ? (
        <div className="space-y-2 p-4">
          <p className="text-center">{formateDateV1(formatted)}</p>
          {data.map((event) => {
            return (
              <p key={event._id} className="text-center font-bold">
                {event.event_name}
              </p>
            );
          })}
        </div>
      ) : (
        <div className="text-center p-4 space-y-2">
          <p>{formateDateV1(formatted)}</p>
          <p className="font-bold">No events today</p>
        </div>
      )}
    </div>
  );
}

export default HappeningToday;
