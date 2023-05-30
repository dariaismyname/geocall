import { useEffect, useRef } from "react";

export const Video = ({ stream, muted }) => {
  const videoRef = useRef();

  useEffect(() => {
    const video = videoRef.current;
    video.srcObject = stream;

    video.onloadedmetadata = () => {
      video.play();
    };
  }, [stream]);
  return (
    <div className="w-[200px] h-[150px]">
      <video
        ref={videoRef}
        width="98%"
        height="98%"
        playsInline
        autoPlay
        muted={muted}
      />
    </div>
  );
};
