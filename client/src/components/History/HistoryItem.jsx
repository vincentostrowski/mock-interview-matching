const HistoryItem = ({ interview }) => {
  return (
    <div>
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div>
          <p className="font-semibold">Topic: {interview.topic}</p>
          <p>Ease: {interview.ease}</p>
          <p>Partner: {interview.partner}</p>
        </div>
        <div>
          <p>{interview.time}</p>
        </div>
      </div>
    </div>
  );
};

export default HistoryItem;
