const HistoryItem = ({ interview }) => {
  return (
    <div>
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div>
          <p className="font-semibold">Topic: {interview.topic}</p>
          <p>Ease: {interview.ease}</p>
          <p>
            Partner:{" "}
            {localStorage.getItem("discordId") ===
            interview.participant1.discordId
              ? interview.participant2.discordId
              : interview.participant1.discordId}
          </p>
        </div>
        <div>
          <p>{interview.time}</p>
        </div>
      </div>
    </div>
  );
};

export default HistoryItem;
