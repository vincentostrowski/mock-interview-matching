import { useState, useContext } from "react";
import { FilterContext } from "../../context/FilterContext";
import { format, addDays } from "date-fns";
import CalendarHeader from "./CalendarHeader";
import CalendarBody from "./CalendarBody";

const Calendar = () => {
  const { filters } = useContext(FilterContext);
  const [timeSlots, setTimeSlots] = useState(new Set());
  const daysOfWeek = [];
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const day = addDays(today, i);
    const formattedDay = format(day, "EEEE");
    daysOfWeek.push(formattedDay);
  }

  return (
    <div className="w-full max-w-6xl mx-auto mt-8">
      <CalendarHeader daysOfWeek={daysOfWeek} />
      <CalendarBody timeSlots={timeSlots} setTimeSlots={setTimeSlots} />
      <div className="flex justify-center gap-4 m-2">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-1 rounded">
          Submit Request
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-1 rounded">
          View Matches
        </button>
      </div>
    </div>
  );
};

export default Calendar;
