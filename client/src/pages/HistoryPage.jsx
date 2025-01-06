import { useState, useEffect } from "react";
import HistoryView from "../components/History/HistoryView";
import InterviewView from "../components/History/InterviewView";
import sessionService from "../services/sessionService";

const HistoryPage = () => {
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const interviews = await sessionService.fetchCompletedSessions();
        setInterviews(interviews);
        setSelectedInterview(interviews[0]);
      } catch (error) {
        console.error("Error fetching interviews:", error);
      }
    };
    fetchInterviews();
  }, []);

  return (
    <div className="w-full flex">
      <div className="flex-1">
        <HistoryView
          interviews={interviews}
          setSelectedInterview={setSelectedInterview}
        />
      </div>
      <div className="flex-1">
        <InterviewView interview={selectedInterview} />
      </div>
    </div>
  );
};

export default HistoryPage;
