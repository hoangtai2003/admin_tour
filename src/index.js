import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import { SidebarProvider } from "./context/SideBarContext.jsx";
import { BrowserRouter } from 'react-router-dom';
ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <SidebarProvider>
                <App />
        </SidebarProvider>
    </BrowserRouter>

);
