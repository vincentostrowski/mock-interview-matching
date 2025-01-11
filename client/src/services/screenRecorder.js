let mediaRecorder;
let recordedChunks = [];
let roomIdGlobal;

const startRecording = async (roomId) => {
  try {
    roomIdGlobal = roomId; // Store the roomId globally
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: { mediaSource: "screen" },
      audio: true,
    });

    startRecordingWithStream(stream);
    return "Recording started";
  } catch (err) {
    console.error("Error starting screen recording:", err);
    throw err;
  }
};

const startRecordingWithStream = (stream) => {
  recordedChunks = [];

  mediaRecorder = new MediaRecorder(stream);
  mediaRecorder.ondataavailable = (event) => recordedChunks.push(event.data);

  mediaRecorder.onstop = () => {
    const blob = new Blob(recordedChunks, { type: "video/webm" });
    const videoUrl = URL.createObjectURL(blob);

    console.log("Generated video URL:", videoUrl);

    // Optionally download the video
    const downloadLink = document.createElement("a");
    downloadLink.href = videoUrl;
    downloadLink.download = `interview_recording_${roomIdGlobal}.webm`;
    downloadLink.click();

    return videoUrl;
  };

  mediaRecorder.start();
};

const stopRecording = () => {
  return new Promise((resolve) => {
    if (mediaRecorder) {
      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunks, { type: "video/webm" });
        const videoUrl = URL.createObjectURL(blob);
        console.log("Generated video URL:", videoUrl);
        resolve(videoUrl); // Resolve the promise with the video URL
      };
      mediaRecorder.stop();
    } else {
      resolve(null); // Resolve with null if no recording was active
    }
  });
};

export default {
  startRecording,
  stopRecording,
};
