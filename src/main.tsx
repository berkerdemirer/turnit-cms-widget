import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./i18n/i18n";
import "./index.css";
import { LoadingOverlay, MantineProvider } from "@mantine/core";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider>
      <Suspense fallback={<LoadingOverlay visible={true} />}>
        <App />
      </Suspense>
    </MantineProvider>
  </React.StrictMode>,
);
