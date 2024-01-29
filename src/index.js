import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { DolphinPGProvider } from "./Context/DolphinPgcontext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DolphinPGProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DolphinPGProvider>
  </React.StrictMode>
);
