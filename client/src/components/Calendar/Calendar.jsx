import { useState, useContext } from "react";
import { FilterContext } from "../../context/FilterContext";
import { format, addDays } from "date-fns";
import CalendarHeader from "./CalendarHeader";
import CalendarBody from "./CalendarBody";
import MatchesPopUp from "../Matches/MatchesPopUp";

const Calendar = () => {
  const { filters } = useContext(FilterContext);
  const [timeSlots, setTimeSlots] = useState(new Set());
  const [showMatches, setShowMatches] = useState(false);
  const daysOfWeek = [];
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const day = addDays(today, i);
    const formattedDay = format(day, "EEEE");
    daysOfWeek.push(formattedDay);
  }

  return (
    <div className="w-full max-w-6xl mx-auto mt-8">
      {showMatches && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <MatchesPopUp
            onClose={() => setShowMatches(false)}
            timeSlots={timeSlots}
            filters={filters}
          />
        </div>
      )}
      <CalendarHeader daysOfWeek={daysOfWeek} />
      <CalendarBody timeSlots={timeSlots} setTimeSlots={setTimeSlots} />
      <div className="flex justify-center gap-4 m-2">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-1 rounded">
          Submit Request
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-1 rounded"
          onClick={() => setShowMatches(!showMatches)}
        >
          View Matches
        </button>
      </div>
    </div>
  );
};

export default Calendar;
