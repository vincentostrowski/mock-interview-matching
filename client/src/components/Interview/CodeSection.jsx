import { useState, useEffect } from "react";
import { ref, onValue, set } from "firebase/database";
import database from "../../firebase"; // Import Firebase configuration

const CodeSection = () => {
  const [text, setText] = useState(""); // Local state for the text
  const textRef = ref(database, "shared-text"); // Reference to the Firebase database node

  // Fetch the initial content and sync with Firebase
  useEffect(() => {
    onValue(textRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        setText(data); // Sync changes from Firebase
      }
    });
  }, []);

  // Handle local input changes and update Firebase
  const handleChange = (e) => {
    const newText = e.target.value;
    setText(newText); // Update local state
    set(textRef, newText); // Update Firebase
  };

  return (
    <div className="flex-1 flex flex-col items-center p-4 bg-gray-900 text-gray-200 h-screen">
      <textarea
        value={text}
        onChange={handleChange}
        className="w-full h-96 p-4 text-sm font-mono bg-gray-900 text-gray-200 outline-none resize-none rounded-b-lg scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800"
        placeholder="// Start typing your code here..."
      />
    </div>
  );
};

export default CodeSection;
