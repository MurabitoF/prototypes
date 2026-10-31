import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "rc-tooltip/assets/bootstrap.css"
import "./useWorkers.ts";
import { useEditorStore } from "./state/store";
import { decodeCode } from "./utils/share";

const sharedCode = new URLSearchParams(location.hash.slice(1)).get("code");
if (sharedCode) {
  try {
    useEditorStore.setState(await decodeCode(sharedCode));
  } catch (error) {
    console.error("Invalid shared link:", error);
  }
  history.replaceState(null, "", location.pathname + location.search);
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

