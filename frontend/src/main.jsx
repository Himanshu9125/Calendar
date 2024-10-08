import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ContextWrapper } from "./Context/ContextWrapper";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContextWrapper>
      <App />
      <ToastContainer />
    </ContextWrapper>
  </StrictMode>
);
