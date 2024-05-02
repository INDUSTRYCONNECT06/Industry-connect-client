import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import LoginState from "./Context/LoginState.jsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <LoginState>
      <App />
    </LoginState>
    </BrowserRouter>
  </React.StrictMode>
);
