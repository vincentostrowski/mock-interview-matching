import VideoCall from "./VideoCall";

const Interview = ({ session, roomId }) => {
  const discordId = localStorage.getItem("discordId");
  const userName =
    discordId === session.participant1
      ? session.participant2
      : session.participant1;

  if (roomId) return <VideoCall roomId={roomId} userName={userName} />;
  return null;
};

export default Interview;
