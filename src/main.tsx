import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

import { TempoDevtools } from "tempo-devtools";
TempoDevtools.init();

// Khởi tạo hệ thống theo dõi
import trackingManager from "./lib/trackingManager";
import { initGTMFormTracking } from "./lib/gtmFormTracking";
trackingManager.init();

// Khởi tạo theo dõi form cho Google Tag Manager
initGTMFormTracking();

const basename = import.meta.env.BASE_URL;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
