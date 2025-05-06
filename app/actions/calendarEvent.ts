"use server";

import { CreateLog } from "@/db/log/log";
import { auth } from "@/auth";
import {
  createCalendarEvent,
  deleteCalendarEvent,
  getCalendarDayEvents,
  getDaysWithCalendarEvent,
  getCalendarEventsByYear,
} from "@/db/calendarEvent/calendarEvent";
import { CalendarEvent } from "@/types";

export async function createCalendarEventAction({
  event_name,
  date,
}: {
  event_name: string;
  date: string;
}) {
  try {
    const session = await auth();
    await createCalendarEvent({
      event_name,
      date,
    });
    await CreateLog({
      action: "CREATE",
      email: session?.user.email!,
      message: "Created a calendar event.",
    });
    return true;
  } catch (error) {
    throw error;
  }
}

export async function getCalendarDayEventsAction({ date }: { date: string }) {
  try {
    const events = await getCalendarDayEvents(date);
    const data: CalendarEvent[] = JSON.parse(JSON.stringify(events));
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getDaysWithCalendarEventAction() {
  try {
    const days = await getDaysWithCalendarEvent();
    const data: string[] = JSON.parse(JSON.stringify(days));
    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteCalendarEventAction(id: string) {
  try {
    const session = await auth();
    await deleteCalendarEvent(id);
    await CreateLog({
      action: "DELETE",
      email: session?.user.email!,
      message: "Deleted a calendar event.",
    });
    return true;
  } catch (error) {
    throw error;
  }
}

export async function getCalendarEventsByYearAction(year: string) {
  try {
    const events = await getCalendarEventsByYear(year);
    const data: CalendarEvent[] = JSON.parse(JSON.stringify(events));
    return data;
  } catch (error) {
    throw error;
  }
}
