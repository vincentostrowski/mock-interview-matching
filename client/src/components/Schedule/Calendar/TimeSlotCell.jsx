const TimeSlotCell = ({
  dayIndex,
  hour,
  hourIndex,
  isSelected,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
}) => {
  return (
    <div
      className={`cursor-pointer border ${
        isSelected ? "bg-blue-500 text-white" : "bg-zinc-500"
      } hover:bg-blue-200`}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      onMouseUp={onMouseUp}
    >
      {hour}
    </div>
  );
};

export default TimeSlotCell;
