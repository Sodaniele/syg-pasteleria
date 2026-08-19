import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import App from "./App.jsx";
import Creator from "./creator/Creator.jsx";

import "./styles.css";

function ProtectedCreator() {
  const isAuthenticated =
    sessionStorage.getItem("syg_creator_authenticated") === "true";

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Creator />;
}

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />

        <Route
          path="/creador"
          element={<ProtectedCreator />}
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);