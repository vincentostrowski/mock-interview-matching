import { JitsiMeeting } from "@jitsi/react-sdk";

const VideoCall = ({ roomId, userName }) => {
  return (
    <div className="video-call-container w-full h-60">
      <JitsiMeeting
        roomName={roomId}
        configOverwrite={{
          startWithAudioMuted: false,
          startWithVideoMuted: false,
          requireDisplayName: false, // Ensure this is set
          filmStripOnly: false, // Show/hide the filmstrip (participant thumbnails)
        }}
        interfaceConfigOverwrite={{
          TOOLBAR_BUTTONS: ["microphone", "camera", "hangup"],
          SHOW_JITSI_WATERMARK: false, // Hide watermark
        }}
        getUserInfo={() => ({
          displayName: userName,
        })} /* 
        onApiReady={(externalApi) => {
          // Attach additional logic here if needed
        }} */
      />
    </div>
  );
};

export default VideoCall;
