import Match from "./Match";
import { useState, useEffect } from "react";

const MatchesPopUp = ({ timeSlots, filters, onClose }) => {
  const [matches, setMatches] = useState([]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 max-h-screen overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Matches</h2>
      <div className="max-h-96 overflow-y-auto">
        {matches &&
          matches.map((match) => (
            <Match key={match.id} match={match} onClose={onClose} />
          ))}
      </div>
      <button
        onClick={onClose}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
      >
        Close
      </button>
    </div>
  );
};

export default MatchesPopUp;
