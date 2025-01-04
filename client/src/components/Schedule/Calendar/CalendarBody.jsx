import { useState } from "react";
import TimeSlotCell from "./TimeSlotCell";

const CalendarBody = ({ timeSlots, setTimeSlots }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [hoverSlots, setHoverSlots] = useState(timeSlots);
  const [undo, setUndo] = useState(false);
  const [undoSlots, setUndoSlots] = useState(new Set());

  const hours = [
    "6am",
    "7am",
    "8am",
    "9am",
    "10am",
    "11am",
    "12pm",
    "1pm",
    "2pm",
    "3pm",
    "4pm",
    "5pm",
    "6pm",
    "7pm",
    "8pm",
    "9pm",
    "10pm",
    "11pm",
    "12am",
  ];

  // Handle mouse down (start of dragging)
  const handleMouseDown = (day, hour) => {
    setIsDragging(true);
    setDragStart({ day, hour });
    if (timeSlots.has(JSON.stringify({ day, hour }))) {
      setUndo(true);
      return;
    }
    setUndo(false);
    setTimeSlots((prev) => new Set([...prev, JSON.stringify({ day, hour })]));
  };

  // Handle mouse enter during dragging
  const handleMouseEnter = (day, hour) => {
    if (isDragging) {
      const hoverRange = calculateHoverRange(dragStart, { day, hour });
      if (!undo) {
        setHoverSlots(hoverRange); // Select the range of cells
      } else if (undo) {
        setUndoSlots(hoverRange);
      }
    }
  };

  // Handle mouse up (end of dragging)
  const handleMouseUp = (day, hour) => {
    setIsDragging(false);
    setDragStart(null);
    //Handle if single cell is selected
    if (dragStart && day === dragStart.day && hour === dragStart.hour) {
      if (undo) {
        const slot = JSON.stringify({ day, hour });
        setTimeSlots((prev) => {
          const newSet = new Set(prev);
          if (newSet.has(slot)) {
            newSet.delete(slot);
          } else {
            newSet.add(slot);
          }
          return newSet;
        });
        setHoverSlots((prev) => {
          const newSet = new Set(prev);
          if (newSet.has(slot)) {
            newSet.delete(slot);
          } else {
            newSet.add(slot);
          }
          return newSet;
        });
        setUndoSlots(new Set());
        setUndo(false);
        return;
      }
      setTimeSlots((prev) => new Set([...prev, JSON.stringify({ day, hour })]));
      return;
    }
    if (undo) {
      setTimeSlots((prev) => {
        const newSet = new Set(prev);
        undoSlots.forEach((slot) => {
          if (newSet.has(slot)) {
            newSet.delete(slot);
          }
        });
        return newSet;
      });
      setHoverSlots((prev) => {
        const newSet = new Set(prev);
        undoSlots.forEach((slot) => {
          if (newSet.has(slot)) {
            newSet.delete(slot);
          }
        });
        return newSet;
      });
      setUndoSlots(new Set());
      return;
    }
    setTimeSlots((prev) => new Set([...prev, ...hoverSlots]));
    setHoverSlots((prev) => new Set([...prev, ...timeSlots]));
  };

  // Helper function to calculate all cells in the selected rectangular range
  const calculateHoverRange = (start, end) => {
    const startDay = Math.min(start.day, end.day);
    const endDay = Math.max(start.day, end.day);
    const startHourIndex = Math.min(start.hour, end.hour);
    const endHourIndex = Math.max(start.hour, end.hour);

    const hoverRange = new Set();

    for (let day = startDay; day <= endDay; day++) {
      for (
        let hourIndex = startHourIndex;
        hourIndex <= endHourIndex;
        hourIndex++
      ) {
        hoverRange.add(JSON.stringify({ day, hour: hourIndex }));
      }
    }
    return hoverRange;
  };

  return (
    <div className="grid grid-cols-7 gap-2" onMouseLeave={handleMouseUp}>
      {Array.from({ length: 7 }).map((_, dayIndex) => (
        <div key={dayIndex} className="border border-gray-300">
          {hours.map((hour, hourIndex) => (
            <TimeSlotCell
              key={`${dayIndex}-${hourIndex}`}
              dayIndex={dayIndex}
              hourIndex={hourIndex}
              hour={hour} // Pass the index for comparison
              isSelected={
                (hoverSlots.has(
                  JSON.stringify({ day: dayIndex, hour: hourIndex })
                ) ||
                  timeSlots.has(
                    JSON.stringify({ day: dayIndex, hour: hourIndex })
                  )) &&
                !undoSlots.has(
                  JSON.stringify({ day: dayIndex, hour: hourIndex })
                )
              }
              onMouseDown={() => handleMouseDown(dayIndex, hourIndex)}
              onMouseEnter={() => handleMouseEnter(dayIndex, hourIndex)}
              onMouseUp={() => handleMouseUp(dayIndex, hourIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default CalendarBody;
