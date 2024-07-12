import { useState } from "react";

const Match = ({ match, onClose }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
      <div>
        <p className="font-semibold">Topic: {match.topic}</p>
        <p>Ease: {match.ease}</p>
        <p>Type: {match.type}</p>
      </div>
      <button className={`py-2 px-4 rounded text-white`}>Match</button>
    </div>
  );
};

export default Match;
