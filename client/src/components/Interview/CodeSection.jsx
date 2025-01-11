import { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import { ref as firebaseRef, onValue, set, remove } from "firebase/database";
import database from "../../firebase";
import ScreenShareAlert from "./ScreenShareAlert";

import CodeMirror from "@uiw/react-codemirror";
import { langs } from "@uiw/codemirror-extensions-langs";
import { dracula } from "@uiw/codemirror-theme-dracula";

const CodeSection = forwardRef(({ roomId }, ref) => {
  const [text, setText] = useState("");
  const textRef = firebaseRef(database, `rooms/${roomId}`);

  // Expose a method to get the current text in the CodeEditor
  useImperativeHandle(ref, () => ({
    getText: () => text, // Return the current value of text
  }));

  useEffect(() => {
    onValue(textRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        setText(data);
      }
    });

    return () => {
      remove(textRef);
    };
  }, []);

  // Updated handler to receive the value directly
  const handleChange = (newText) => {
    setText(newText);
    set(textRef, newText);
  };

  return (
    <div className="relative flex-1 flex flex-col items-center bg-gray-800 text-gray-100">
      <CodeMirror
        value={text}
        height="400px"
        theme={dracula}
        extensions={[langs.python()]}
        onChange={handleChange}
        className="w-full h-full rounded-b-lg overflow-hidden"
        basicSetup={{
          lineNumbers: true,
          highlightActiveLineGutter: true,
          highlightSpecialChars: true,
          history: true,
          foldGutter: false,
          drawSelection: true,
          dropCursor: true,
          allowMultipleSelections: true,
          indentOnInput: true,
          syntaxHighlighting: true,
          bracketMatching: true,
          closeBrackets: true,
          autocompletion: false,
          rectangularSelection: true,
          crosshairCursor: true,
          highlightActiveLine: true,
          highlightSelectionMatches: true,
          closeBracketsKeymap: true,
          defaultKeymap: true,
          searchKeymap: true,
          historyKeymap: true,
          foldKeymap: true,
          completionKeymap: true,
          lintKeymap: true,
        }}
      />
      <ScreenShareAlert roomId={roomId} />
    </div>
  );
});

// Assign a display name to the component
CodeSection.displayName = "CodeSection";

export default CodeSection;
