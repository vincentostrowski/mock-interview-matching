import { useState } from "react";
import gptService from "../../services/gptService";
import ReactMarkdown from "react-markdown";

const AIHelper = ({ session, codeEditorRef }) => {
  const user = localStorage.getItem("discordId");
  const isParticipant1 = user === session.participant1;
  const other = isParticipant1 ? session.participant2 : session.participant1;
  const [problem, setProblem] = useState(
    isParticipant1 ? session.problem2 : session.problem1
  );
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [approach, setApproach] = useState("");

  const handleRequest = async () => {
    const code = codeEditorRef.current.getText();
    const prompt = `The problem is: ${problem}\n\n${other.discordId}'s approach: ${approach}\n\n${other.discordId}'s code:\n${code}. Give a concise guidance on getting closer to the solution without giving it (Don't tell what to do, but nudge on how to get closer to this). Please don't use any formatting for your response as this will not be formatted in the final message.`;
    const response = await gptService.fetchGptResponse(prompt);
    setLoading(false);
    setResponse(response);
  };

  return (
    <div className="relative flex-1 w-full text-white p-2 shadow-lg">
      <h2 className="w-full text-center text-sm mb-2">
        AI Interviewer Assistance
      </h2>
      <div className="h-56 overflow-y-scroll scrollbar-minimal">
        <ReactMarkdown className="text-sm mb-4">{response}</ReactMarkdown>
      </div>
      <div className="w-full absolute bottom-2 left-0 p-1">
        <div className="w-full flex gap-2 p-2 text-gray-300 text-xs">
          <div>{other.discordId + "'s problem: "}</div>
          <input
            type="text"
            onChange={(e) => setProblem(e.target.value)}
            value={problem}
            className="bg-gray-800 bg-zinc-900 flex-1"
          />
        </div>
        <textarea
          value={approach}
          placeholder={`To help guide ${other.discordId}, tell me the approach they're using.\nNo need to send their code, I’ll have access to this.`}
          onChange={(e) => setApproach(e.target.value)}
          className="w-full p-2 bg-zinc-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
        />
        <button
          onClick={() => {
            setLoading(true);
            handleRequest();
          }}
          className="w-full text-sm p-1 bg-zinc-800 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          {loading ? "Loading..." : "Guide"}
        </button>
      </div>
    </div>
  );
};

export default AIHelper;
