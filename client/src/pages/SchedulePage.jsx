import { useEffect, useState } from "react";
import CalendarView from "../components/Schedule/CalendarView";
import ScheduledView from "../components/Schedule/ScheduledView";
import RequestView from "../components/Schedule/RequestView";
import sessionService from "../services/sessionService";

const SchedulePage = () => {
  const [requestedSessions, setRequestedSessions] = useState([]);
  const [scheduledSessions, setScheduledSessions] = useState([]);

  useEffect(() => {
    const fetchSessions = async () => {
      const sessions = await sessionService.fetchUncompletedSessions();
      setRequestedSessions(sessions.requested);
      setScheduledSessions(sessions.scheduled);
    };

    fetchSessions();
  }, []);

  return (
    <div className="bg-black">
      <div className="flex">
        <div className="flex-1 p-4 pr-2">
          <ScheduledView sessions={scheduledSessions} />
        </div>
        <div className="flex-1 p-4 pl-2">
          <RequestView sessions={requestedSessions} />
        </div>
      </div>
      <div className="p-4 pt-2">
        <CalendarView />
      </div>
    </div>
  );
};

export default SchedulePage;
