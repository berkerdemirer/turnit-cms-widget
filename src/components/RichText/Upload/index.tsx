import React from "react";
import { Media } from "@/components/Media";

export type Props = {
  node: any;
  className?: string;
};

export const RichTextUpload: React.FC<Props> = (props) => {
  const {
    node: { fields, value },
    className,
  } = props;

  const styles: React.CSSProperties = {};

  return (
    <div style={styles} className={className}>
      <div>
        <Media resource={value} />
      </div>
    </div>
  );
};

export default RichTextUpload;
