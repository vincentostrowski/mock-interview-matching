import HistoryItem from "./HistoryItem";

const HistoryView = ({ interviews, setSelectedInterview }) => {
  return (
    <div>
      {interviews.map((interview) => (
        <div key={interview.id} onClick={() => setSelectedInterview(interview)}>
          <HistoryItem interview={interview} />
        </div>
      ))}
      {interviews.length === 0 && (
        <div className="text-center text-2xl font-bold">
          No past interviews found
        </div>
      )}
    </div>
  );
};

export default HistoryView;
