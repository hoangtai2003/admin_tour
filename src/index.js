import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import { SidebarProvider } from "./context/SideBarContext.jsx";
import { AuthContextProvider } from "./context/AuthContext.js";
ReactDOM.createRoot(document.getElementById("root")).render(
    <AuthContextProvider>
      <SidebarProvider>
        <App />
      </SidebarProvider>
    </AuthContextProvider>

);
