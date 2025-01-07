import VideoCall from "./VideoCall";
import { useState, useEffect } from "react";
import sessionService from "../../services/sessionService";

const Interview = ({ session }) => {
  const [roomId, setRoomId] = useState(null);
  const discordId = localStorage.getItem("discordId");
  const userName =
    discordId === session.participant1
      ? session.participant2
      : session.participant1;

  useEffect(() => {
    const fetchRoomId = async () => {
      const roomId = await sessionService.fetchRoomId(session.id);
      console.log(roomId);
      setRoomId(roomId);
    };
    fetchRoomId();
  }, []);

  if (roomId) return <VideoCall roomId={roomId} userName={userName} />;
  return null;
};

export default Interview;
