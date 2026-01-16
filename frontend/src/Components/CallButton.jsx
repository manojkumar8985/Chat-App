import { VideoIcon } from "lucide-react";

function CallButton({ handleVideoCall }) {
  return (
    <button
      onClick={handleVideoCall}
      className="video-call-btn"
      title="Start Video Call"
    >
      <VideoIcon size={18} />
    </button>
  );
}

export default CallButton;
