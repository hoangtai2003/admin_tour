import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import { SidebarProvider } from "./context/SideBarContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <SidebarProvider>
    <App />
</SidebarProvider>

);
