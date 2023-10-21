import React from "react";
import classes from "./index.module.css";
import { YouTubePlayer } from "@/components/RichText/Video/Youtube";
import { VimeoPlayer } from "@/components/RichText/Video/Vimeo";

export const Video: React.FC<{
  platform?: "vimeo" | "youtube";
  id?: string;
}> = (props) => {
  const { platform = "vimeo", id } = props;

  return (
    <div
      className={classes.videoPlayer}
      style={{
        paddingTop: "56.25%",
      }}
    >
      {platform === "youtube" && <YouTubePlayer videoID={id} />}
      {platform === "vimeo" && <VimeoPlayer videoID={id} />}
    </div>
  );
};
