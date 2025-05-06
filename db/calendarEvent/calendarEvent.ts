import { connectDB } from "../connection/connection";
import CalendarEventModel from "../models/calendar_event";

export async function createCalendarEvent({
  event_name,
  date,
}: {
  event_name: string;
  date: string;
}) {
  try {
    await connectDB();
    const event = await CalendarEventModel.create({
      date,
      event_name,
    });
    return event;
  } catch (error) {
    throw error;
  }
}

export async function getCalendarDayEvents(date: string) {
  try {
    await connectDB();
    const events = await CalendarEventModel.find({
      date,
    });
    return events;
  } catch (error) {
    throw error;
  }
}

export async function editCalendarEvent({
  id,
  event_name,
}: {
  id: string;
  event_name: string;
}) {
  try {
    await connectDB();
    const event = await CalendarEventModel.findByIdAndUpdate(id, {
      event_name,
    });
    return event;
  } catch (error) {
    throw error;
  }
}

export async function deleteCalendarEvent(id: string) {
  try {
    await connectDB();
    const event = await CalendarEventModel.findByIdAndDelete(id);
    return event;
  } catch (error) {
    throw error;
  }
}

export async function getDaysWithCalendarEvent() {
  try {
    const days = await CalendarEventModel.distinct("date");
    return days;
  } catch (error) {
    throw error;
  }
}
