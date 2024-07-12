const CalendarHeader = ({ daysOfWeek }) => {
  return (
    <div className="grid grid-cols-7 bg-gray-200 py-4 gap-2">
      {daysOfWeek.map((day, index) => (
        <div key={index} className="text-center font-semibold">
          {day}
        </div>
      ))}
    </div>
  );
};

export default CalendarHeader;
