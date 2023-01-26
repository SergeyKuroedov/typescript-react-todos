import React from "react";
import ReactDOM from "react-dom/client";
import "./style.scss";
import App from "./components/App/App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);
