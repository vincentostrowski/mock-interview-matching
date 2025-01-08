import { useState } from "react";
import gptService from "../../services/gptService";

const AIHelper = ({ session, codeEditorRef }) => {
  const user = localStorage.getItem("discordId");
  const isParticipant1 = user === session.participant1;
  const other = isParticipant1 ? session.participant2 : session.participant1;
  const [problem, setProblem] = useState(
    isParticipant1 ? session.problem2 : session.problem1
  );
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [approach, setApproach] = useState("");

  const handleRequest = async () => {
    const code = codeEditorRef.current.getText();
    const prompt = `The problem is: ${problem}\n\n${other.discordId}'s approach: ${approach}\n\n${other.discordId}'s code:\n${code}`;
    const response = await gptService.fetchGptResponse(prompt);
    setResponse(response);
  };

  return (
    <div className="relative flex-1 w-full bg-gray-800 text-white p-2 shadow-lg">
      <h2 className="w-full text-center text-sm mb-4">
        AI Interviewer Assistance
      </h2>
      <h3 className="text-sm mb-4">{response}</h3>
      <div className="w-full absolute bottom-2 left-0 p-1">
        <div className="w-full flex gap-2 p-2 text-gray-300 text-xs">
          <div>{other.discordId + "'s problem: "}</div>
          <input
            type="text"
            value={problem}
            className="bg-gray-800 text-gray-300 flex-1"
          />
        </div>
        <textarea
          value={approach}
          placeholder={`To help guide ${other.discordId}, tell me the approach they're using.\nNo need to send their code, I’ll have access to this.`}
          onChange={(e) => setApproach(e.target.value)}
          className="w-full p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
        />
        <button
          onClick={() => {
            setLoading(true);
            handleRequest();
            setLoading(false);
          }}
          className="w-full text-sm p-1 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          {loading ? "Loading..." : "Guide"}
        </button>
      </div>
    </div>
  );
};

export default AIHelper;
