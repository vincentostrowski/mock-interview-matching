import { useState, useEffect } from "react";
import Interview from "../components/Interview/Interview";
import AIHelper from "../components/Interview/AIHelper";
import CodeSection from "../components/Interview/CodeSection";
import Countdown from "../components/Interview/Countdown";
import sessionService from "../services/sessionService";

const InterviewPage = () => {
  const [upcomingSession, setUpcomingSession] = useState(null);
  const [scheduledTime, setScheduledTime] = useState(null);

  useEffect(() => {
    const fetchUpcomingSession = async () => {
      const sessions = await sessionService.fetchUncompletedSessions();
      if (sessions.scheduled) {
        setUpcomingSession(sessions.scheduled[0]);
        setScheduledTime(
          new Date(sessions.scheduled[0].scheduledTime).getTime()
        );
      } else {
        setUpcomingSession("none");
      }
    };
    fetchUpcomingSession();
  }, []);

  return (
    <div className="flex-1 flex">
      {!upcomingSession && <h1>loading</h1>}
      {upcomingSession === "none" && <h1>No upcoming sessions</h1>}
      {upcomingSession &&
      scheduledTime - 600000 < Date.now() &&
      Date.now() < scheduledTime + 3600000 ? (
        <>
          <CodeSection />
          <div className="w-1/3 flex flex-col">
            <Interview session={upcomingSession} />
            <AIHelper session={upcomingSession} />
          </div>
        </>
      ) : (
        <>
          <Countdown session={upcomingSession} />
        </>
      )}
    </div>
  );
};

export default InterviewPage;
