import { createContext, useState } from "react";
import { PropTypes } from "prop-types";

export const SidebarContext = createContext({});

export const SidebarProvider = ({ children }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const url = 'http://localhost:4000/api/v1'
    const openSidebar = () => {
      setSidebarOpen(true);
    };

    const closeSidebar = () => {
      setSidebarOpen(false);
    };

  return (
    <SidebarContext.Provider
        value={{
            isSidebarOpen,
            openSidebar,
            closeSidebar,
            url
        }}
    >
        {children}    
    </SidebarContext.Provider>
  );
};

SidebarProvider.propTypes = {
    children: PropTypes.node,
};
