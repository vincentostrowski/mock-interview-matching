import requestService from "../../services/requestService";
import { useState } from "react";

const Match = ({ match, onClose }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleMatch = async () => {
    setIsClicked(true);
    try {
      const response = await requestService.handleMatch(
        match.id,
        match.user.discordId
      );
      console.log("Match created successfully:", response);
      onClose();
    } catch (error) {
      console.error("Failed to create match:", error);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
      <div>
        <p className="font-semibold">Topic: {match.topic}</p>
        <p>Ease: {match.ease}</p>
        <p>Type: {match.type}</p>
      </div>
      <button
        className={`py-2 px-4 rounded text-white ${
          isClicked ? "bg-blue-400" : "bg-blue-500 hover:bg-blue-600"
        }`}
        onClick={handleMatch}
      >
        Match
      </button>
    </div>
  );
};

export default Match;
