import { useState, useEffect, useRef } from "react";
import Interview from "../components/Interview/Interview";
import AIHelper from "../components/Interview/AIHelper";
import CodeSection from "../components/Interview/CodeSection";
import Countdown from "../components/Interview/Countdown";
import sessionService from "../services/sessionService";

const InterviewPage = () => {
  const [upcomingSession, setUpcomingSession] = useState(null);
  const [scheduledTime, setScheduledTime] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const codeEditorRef = useRef(null);

  useEffect(() => {
    const fetchUpcomingSession = async () => {
      const sessions = await sessionService.fetchUncompletedSessions();
      if (sessions.scheduled) {
        setUpcomingSession(sessions.scheduled[0]);
        setScheduledTime(
          new Date(sessions.scheduled[0].scheduledTime).getTime()
        );
        //set the roomId
        const roomId = await sessionService.fetchRoomId(
          sessions.scheduled[0].id
        );
        setRoomId(roomId);
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
      roomId &&
      scheduledTime - 600000 < Date.now() &&
      Date.now() < scheduledTime + 3600000 ? (
        <>
          <CodeSection roomId={roomId} ref={codeEditorRef} />
          <div className="w-1/3 flex flex-col bg-zinc-900">
            <Interview session={upcomingSession} roomId={roomId} />
            <AIHelper session={upcomingSession} codeEditorRef={codeEditorRef} />
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
