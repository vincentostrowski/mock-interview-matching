const VideoCall = () => {
  const callUrl = `https://meet.jit.si/${"testklajfdaoji2o3jr"}`;
  return (
    <iframe
      src={callUrl}
      title="Video Call"
      className="absolute top-0 right-0 w-60 h-full"
      allow="camera; microphone"
    />
  );
};

export default VideoCall;
