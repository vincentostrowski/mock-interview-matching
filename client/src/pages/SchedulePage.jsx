import CalendarView from "../components/Schedule/CalendarView";
import ScheduledView from "../components/Schedule/ScheduledView";
import RequestView from "../components/Schedule/RequestView";

const SchedulePage = () => {
  return (
    <div className="bg-black">
      <div className="flex">
        <div className="flex-1 p-4 pr-2">
          <ScheduledView />
        </div>
        <div className="flex-1 p-4 pl-2">
          <RequestView />
        </div>
      </div>
      <div className="p-4 pt-2">
        <CalendarView />
      </div>
    </div>
  );
};

export default SchedulePage;
