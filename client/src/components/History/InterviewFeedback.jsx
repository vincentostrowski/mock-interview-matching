import { useState } from "react";
import sessionService from "../../services/sessionService";

const InterviewFeedback = ({ interview }) => {
  const user = localStorage.getItem("discordId");

  // Determine which feedback is associated with the logged-in user
  const isParticipant1 = interview.participant1.discordId === user;

  // Set initial focus: user (logged-in user) or other
  const [focus, setFocus] = useState(isParticipant1 ? "user" : "other");
  const [feedback1, setFeedback1] = useState(interview.feedback1 || "");
  const [feedback2, setFeedback2] = useState(interview.feedback2 || "");

  // Dynamically set feedback based on focus
  const feedback =
    focus === "user"
      ? isParticipant1
        ? feedback1
        : feedback2
      : isParticipant1
      ? feedback2
      : feedback1;

  const [editableFeedback, setEditableFeedback] = useState(feedback);

  const saveFeedback = async () => {
    try {
      let feedbackKey;
      if (isParticipant1) {
        if (focus === "user") {
          feedbackKey = "feedback1";
          setFeedback1(editableFeedback);
        } else {
          feedbackKey = "feedback2";
          setFeedback2(editableFeedback);
        }
      } else {
        if (focus === "user") {
          feedbackKey = "feedback2";
          setFeedback2(editableFeedback);
        } else {
          feedbackKey = "feedback1";
          setFeedback1(editableFeedback);
        }
      }

      await sessionService.saveFeedback(
        interview.id,
        editableFeedback,
        feedbackKey
      );
    } catch (error) {
      console.error("Error saving feedback:", error);
    }
  };

  return (
    <div className="bg-gray-200 text-center">
      <h3 className="text-lg font-bold">Feedback</h3>
      <div className="w-full flex">
        {/* User's Feedback */}
        <div
          className={`w-1/2 p-4 cursor-pointer ${
            focus === "user" ? "bg-gray-200 font-bold" : "bg-gray-100"
          }`}
          onClick={() => {
            setFocus("user");
            setEditableFeedback(isParticipant1 ? feedback1 : feedback2);
          }}
        >
          {user}
        </div>

        {/* Other's Feedback */}
        <div
          className={`w-1/2 p-4 cursor-pointer ${
            focus === "other" ? "bg-gray-200 font-bold" : "bg-gray-100"
          }`}
          onClick={() => {
            setFocus("other");
            setEditableFeedback(isParticipant1 ? feedback2 : feedback1);
          }}
        >
          {isParticipant1
            ? interview.participant2.discordId
            : interview.participant1.discordId}
        </div>
      </div>

      {/* Feedback Textarea */}
      <form
        className="p-4"
        onSubmit={(e) => {
          e.preventDefault();
          saveFeedback();
        }}
      >
        <textarea
          className="w-full h-52 border rounded p-2"
          value={editableFeedback}
          onChange={(e) => setEditableFeedback(e.target.value)}
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default InterviewFeedback;
