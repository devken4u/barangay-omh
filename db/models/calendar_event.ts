import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const CalendarEventSchema = new Schema(
  {
    event_name: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CalendarEventModel =
  models?.CalendarEvent || model("CalendarEvent", CalendarEventSchema);
export default CalendarEventModel;
