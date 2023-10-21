import React, { Fragment } from "react";
import escapeHTML from "escape-html";
import { RichTextUpload } from "../Upload";
import { Video } from "../Video";

type Node = {
  type: string;
  value?: {
    url: string;
    alt: string;
  };
  children?: Node[];
  url?: string;
  [key: string]: unknown;
  newTab?: boolean;
};

export type CustomRenderers = {
  [key: string]: (args: {
    node: Node;
    Serialize: SerializeFunction;
    index: any;
  }) => JSX.Element; // eslint-disable-line
};

type SerializeFunction = React.FC<{
  content?: Node[];
  customRenderers?: CustomRenderers;
}>;

const isText = (value: any): boolean =>
  typeof value === "object" && value !== null && typeof value.text === "string";

export const Serialize: SerializeFunction = ({ content, customRenderers }) => {
  return (
    <Fragment>
      {content?.map((node, i) => {
        if (isText(node)) {
          let text = (
            <span
              dangerouslySetInnerHTML={{
                __html: escapeHTML(node.text as string),
              }}
            />
          );

          if (node.bold) {
            text = <strong key={i}>{text}</strong>;
          }

          if (node.code) {
            text = <code key={i}>{text}</code>;
          }

          if (node.italic) {
            text = <em key={i}>{text}</em>;
          }

          if (node.underline) {
            text = (
              <span style={{ textDecoration: "underline" }} key={i}>
                {text}
              </span>
            );
          }
          if (node.strikethrough) {
            text = (
              <span style={{ textDecoration: "line-through" }} key={i}>
                {text}
              </span>
            );
          }

          return <Fragment key={i}>{text}</Fragment>;
        }

        if (!node) {
          return null;
        }

        if (
          customRenderers &&
          customRenderers[node.type] &&
          typeof customRenderers[node.type] === "function"
        ) {
          return customRenderers[node.type]({ node, Serialize, index: i });
        }

        switch (node.type) {
          case "br":
            return <br key={i} />;
          case "h1":
            return (
              <h1 key={i}>
                <Serialize
                  content={node.children}
                  customRenderers={customRenderers}
                />
              </h1>
            );
          case "h2":
            return (
              <h2 key={i}>
                <Serialize
                  content={node.children}
                  customRenderers={customRenderers}
                />
              </h2>
            );
          case "h3":
            return (
              <h3 key={i}>
                <Serialize
                  content={node.children}
                  customRenderers={customRenderers}
                />
              </h3>
            );
          case "h4":
            return (
              <h4 key={i}>
                <Serialize
                  content={node.children}
                  customRenderers={customRenderers}
                />
              </h4>
            );
          case "h5":
            return (
              <h5 key={i}>
                <Serialize
                  content={node.children}
                  customRenderers={customRenderers}
                />
              </h5>
            );
          case "h6":
            return (
              <h6 key={i}>
                <Serialize
                  content={node.children}
                  customRenderers={customRenderers}
                />
              </h6>
            );
          case "quote":
            return (
              <blockquote key={i}>
                <Serialize
                  content={node.children}
                  customRenderers={customRenderers}
                />
              </blockquote>
            );
          case "ul":
            return (
              <ul key={i}>
                <Serialize
                  content={node.children}
                  customRenderers={customRenderers}
                />
              </ul>
            );
          case "ol":
            return (
              <ol key={i}>
                <Serialize
                  content={node.children}
                  customRenderers={customRenderers}
                />
              </ol>
            );
          case "li":
            return (
              <li key={i}>
                <Serialize
                  content={node.children}
                  customRenderers={customRenderers}
                />
              </li>
            );
          case "upload": {
            return <RichTextUpload key={i} node={node} />;
          }
          case "video": {
            const { source, id: videoID } = node;

            if (source === "vimeo" || source === "youtube") {
              return <Video key={i} platform={source} id={videoID as string} />;
            }

            return null;
          }
          case "link": {
            let { url } = node;
            const { linkType, newTab } = node;

            if (!url?.startsWith("http://") && !url?.startsWith("https://")) {
              url = "http://" + url; // or "https://" if you prefer
            }

            // Check linkType if you have any specific requirements for custom link types.
            if (linkType === "custom") {
              return (
                <a
                  href={url}
                  key={i}
                  target={newTab ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                >
                  <Serialize
                    content={node.children}
                    customRenderers={customRenderers}
                  />
                </a>
              );
            }

            return null;
          }
          default:
            return (
              <p key={i}>
                <Serialize
                  content={node.children}
                  customRenderers={customRenderers}
                />
              </p>
            );
        }
      })}
    </Fragment>
  );
};
