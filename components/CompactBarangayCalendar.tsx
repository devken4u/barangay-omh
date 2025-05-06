"use client";

import { getDaysWithCalendarEventAction } from "@/app/actions/calendarEvent";
import { useActionState, startTransition, useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CompactCalendarEvents from "./CompactCalendarEvents";
import { Loader } from "lucide-react";

function CompactBarangayCalendar() {
  const today = new Date();
  const year = today.getFullYear().toString();

  const [selectedYear, setSelectedYear] = useState(year);

  const [state, action, isPending] = useActionState(async () => {
    const days = await getDaysWithCalendarEventAction();
    const formattedDays = days.map((day) => {
      return day.slice(0, 4);
    });
    return [...new Set(formattedDays)];
  }, null);

  useEffect(() => {
    startTransition(() => {
      action();
    });
  }, []);

  return (
    <div>
      <div className="space-x-2 flex">
        <Select
          value={selectedYear}
          onValueChange={(value) => {
            setSelectedYear(value);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a year" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Year</SelectLabel>
              {state &&
                state.length > 0 &&
                !isPending &&
                state.map((day) => {
                  return (
                    <SelectItem key={day} value={day}>
                      {day}
                    </SelectItem>
                  );
                })}
            </SelectGroup>
          </SelectContent>
        </Select>
        {isPending && <Loader className="animate-spin" />}
      </div>
      <CompactCalendarEvents year={selectedYear} />
    </div>
  );
}

export default CompactBarangayCalendar;
