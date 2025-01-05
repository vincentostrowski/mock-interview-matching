//For each scheudled interview, should be able to set the problem, the time, wehther to cancel
//Should see the person it's with

const ScheduledSession = ({ session }) => {
  return (
    <div className="h-full p-4 bg-gray-100 rounded-lg bg-zinc-800 text-white shadow-lg mx-1">
      <p>Topic: {session.topic}</p>
      <p>Ease: {session.ease}</p>
      <p>Type: {session.type}</p>
      <p>
        Partner:{" "}
        {localStorage.getItem("discordId") === session.participant1.discordId
          ? session.participant2.discordId
          : session.participant1.discordId}
      </p>
      <p>Time:</p>
    </div>
  );
};

export default ScheduledSession;
