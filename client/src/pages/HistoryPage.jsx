import { useState } from "react";
import HistoryView from "../components/History/HistoryView";
import InterviewView from "../components/History/InterviewView";

const mock = [
  {
    id: 1,
    interview: {
      ease: "Easy",
      topic: "Graphs",
      partner: "john23x",
      time: "12:00",
      john23x: "Set Problem",
      vincentost778: "Rotten Oranges",
    },
  },
  {
    id: 2,
    interview: {
      ease: "Easy",
      topic: "Graphs",
      partner: "john23x",
      time: "12:00",
      john23x: "Set Problem",
      vincentost778: "Rotten Oranges",
    },
  },
  {
    id: 3,
    interview: {
      ease: "Easy",
      topic: "Graphs",
      partner: "john23x",
      time: "12:00",
      john23x: "Set Problem",
      vincentost778: "Rotten Oranges",
    },
  },
];

const HistoryPage = () => {
  const [selectedInterview, setSelectedInterview] = useState(mock[0].interview);

  return (
    <div className="w-full flex">
      <div className="flex-1">
        <HistoryView
          interviews={mock}
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
