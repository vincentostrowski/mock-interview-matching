import InterviewFeedback from "./InterviewFeedback";

const InterviewView = ({ interview }) => {
  return (
    <div className="w-full h-full">
      <h3 className="text-2xl font-bold text-center">
        Jan 7th 2025 {interview ? interview.id : null}
      </h3>
      <div className="bg-gray-300 w-full h-full"></div>
      {interview && <InterviewFeedback interview={interview} />}
    </div>
  );
};

export default InterviewView;
