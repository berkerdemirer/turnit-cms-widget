import React, { useState } from "react";
import { Props } from "@/components/Media/types";
import { createPortal } from "react-dom";

export const Image: React.FC<Props> = (props) => {
  const {
    resource,
    onClick: onClickFromProps,
    onLoad: onLoadFromProps,
    src: srcFromProps,
    alt: altFromProps,
    width: widthFromProps,
    height: heightFromProps,
  } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  let width: number | undefined = widthFromProps;
  let height: number | undefined = heightFromProps;
  let alt = altFromProps;
  let src: string | undefined = srcFromProps;

  if (!src && resource) {
    alt = resource.alt;
    src = `http://localhost:3000/media/${resource.filename}`;
  }

  const handleImageClick = () => {
    setIsModalOpen(true);
    if (onClickFromProps) onClickFromProps();
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <React.Fragment>
      <figure
        style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}
        onClick={handleImageClick}
      >
        <img
          src={src || ""}
          alt={alt || ""}
          onLoad={() => {
            setIsLoading(false);
            if (typeof onLoadFromProps === "function") {
              onLoadFromProps();
            }
          }}
          style={{ maxWidth: "100%" }}
        />
      </figure>

      {isModalOpen &&
        createPortal(
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 9999,
            }}
            onClick={closeModal}
          >
            <img
              src={src || ""}
              alt={alt || ""}
              style={{ maxWidth: "90%", maxHeight: "90%" }}
            />
          </div>,
          document.body, // This is where the modal will be appended to
        )}
    </React.Fragment>
  );
};
