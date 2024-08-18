import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { SidebarProvider } from "./context/SideBarContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <ThemeProvider>
    <SidebarProvider>
      <App />
    </SidebarProvider>
  </ThemeProvider>
);
