import HistoryItem from "./HistoryItem";

const HistoryView = ({ interviews, setSelectedInterview }) => {
  return (
    <div>
      {interviews.map((interview) => (
        <HistoryItem key={interview.id} interview={interview} />
      ))}
    </div>
  );
};

export default HistoryView;
