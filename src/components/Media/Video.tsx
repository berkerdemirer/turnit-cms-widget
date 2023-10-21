import React, { useEffect, useRef } from "react";
import { Props } from "@/components/Media/types";

export const Video: React.FC<Props> = (props) => {
  const { resource, onClick } = props;

  const videoRef = useRef<HTMLVideoElement>(null);
  // const [showFallback] = useState<boolean>()

  useEffect(() => {
    const { current: video } = videoRef;
    if (video) {
      video.addEventListener("suspend", () => {
        // setShowFallback(true);
        // console.warn('Video was suspended, rendering fallback image.')
      });
    }
  }, []);

  if (resource) {
    return (
      <video
        playsInline
        autoPlay
        muted
        loop
        controls={false}
        onClick={onClick}
        ref={videoRef}
      >
        <source src={`http://localhost:3000/api/media/${resource.filename}`} />
      </video>
    );
  }

  return null;
};
