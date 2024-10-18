import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const SidebarContext = createContext(null);

export const SidebarProvider = (props) => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [token, setToken] = useState("")
    const [ user, setUser ] = useState([])
    const url = 'http://localhost:4000/api/v1'
    const openSidebar = () => {
      setSidebarOpen(true);
    };
    const closeSidebar = () => {
      setSidebarOpen(false);
    };
    useEffect(() => {
        const storedToken = localStorage.getItem("token_admin")
        if (storedToken){
            setToken(storedToken)
        }
    }, [])
    useEffect(() => {
        const fetchUserInfo = async() => {
            try {
                const response = await axios.get(`${url}/auth/users`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setUser(response.data.data)
            } catch(error){
                console.error("Lỗi khi lấy thông tin người dùng", error);
            }
        }
        if(token){
            fetchUserInfo()
        }
    }, [url, token])
    const contextValue = {
        isSidebarOpen,
        openSidebar,
        closeSidebar,
        url,
        token,
        setToken,
        user,
        setUser
    }
    return (
        <SidebarContext.Provider value={contextValue}>
            {props.children}    
        </SidebarContext.Provider>
    );
};
