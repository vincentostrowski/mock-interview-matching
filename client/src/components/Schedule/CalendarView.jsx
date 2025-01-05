import FilterBar from "./Filters/FilterBar";
import Calendar from "./Calendar/Calendar";

const CalendarView = ({ setRequestedSessions, setScheduledSessions }) => {
  return (
    <div className="w-full h-full p-4 bg-zinc-900 rounded-lg">
      <h1 className="text-base font-bold text-white text-center p-1">
        Find Interviews
      </h1>
      <FilterBar />
      <Calendar
        setRequestedSessions={setRequestedSessions}
        setScheduledSessions={setScheduledSessions}
      />
    </div>
  );
};

export default CalendarView;
