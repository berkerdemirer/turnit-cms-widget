import type { ElementType, Ref } from "react";

export interface Media {
  id: string;
  alt: string;
  updatedAt: string;
  createdAt: string;
  url?: string;
  filename?: string;
  mimeType?: string;
  filesize?: number;
  width?: number;
  height?: number;
}

export interface Props {
  src?: string; // for static media
  alt?: string;
  resource?: Media;
  className?: string;
  imgClassName?: string;
  videoClassName?: string;
  htmlElement?: ElementType | null;
  onClick?: () => void;
  onLoad?: () => void;
  ref?: Ref<null | HTMLImageElement | HTMLVideoElement>;
  width?: number;
  height?: number;
}
