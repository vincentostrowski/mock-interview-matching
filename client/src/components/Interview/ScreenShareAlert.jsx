import { useState, useEffect } from "react";
import screenrecorder from "../../services/screenRecorder";

const ScreenShare = ({ roomId }) => {
  const [isSharing, setIsSharing] = useState(false);
  const [decline, setDecline] = useState(false);

  const startScreenShare = async () => {
    try {
      await screenrecorder.startRecording(roomId);
      setIsSharing(true);
    } catch (err) {
      console.error("Error starting screen recording:", err);
    }
  };

  useEffect(() => {
    if (isSharing) {
      const stopSharing = async () => {
        await screenrecorder.stopRecording();
      };

      return stopSharing; // Cleanup on component unmount
    }
  }, [isSharing]);

  if (decline) {
    return null;
  }

  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 p-4 bg-zinc-900 text-white text-xs rounded-lg shadow-lg">
      {!isSharing ? (
        <div>
          <p className="mb-3">
            Record and download the interview by sharing your screen with audio
            enabled.
          </p>
          <div className="flex justify-center items-center gap-4">
            <button
              onClick={startScreenShare}
              className="bg-blue-500 text-white p-2 rounded-lg"
            >
              Record
            </button>
            <button
              onClick={() => setDecline(true)}
              className="bg-blue-500 text-white p-2 rounded-lg"
            >
              Decline
            </button>
          </div>
        </div>
      ) : (
        <p>
          Recording in progress. Leave the interview to download the recording.
        </p>
      )}
    </div>
  );
};

export default ScreenShare;
