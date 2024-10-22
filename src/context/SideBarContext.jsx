import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const SidebarContext = createContext(null);

export const SidebarProvider = (props) => {
    const [ isSidebarOpen, setSidebarOpen ] = useState(false);
    const [ token, setToken ] = useState("")
    const [ user, setUser ] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const url = 'http://localhost:4000/api/v1'
    const navigate = useNavigate()
    const userPermissions = user?.userRole?.rolePermission?.map(permission => permission.slug) || [];
    const openSidebar = () => {
      setSidebarOpen(true);
    };
    const closeSidebar = () => {
      setSidebarOpen(false);
    };
    useEffect(() => {
        const storedToken = localStorage.getItem("token_admin");
        if (storedToken) {
            setToken(storedToken);
        } else {
            setIsLoading(false); 
        }
    }, []);
    
    useEffect(() => {
        const fetchUserInfo = async () => {
            setIsLoading(true); 
            try {
                const response = await axios.get(`${url}/auth/users`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(response.data.data);
            } catch (error) {
                if (error.response) {
                    localStorage.removeItem("token_admin");
                    setToken(null);
                    navigate('/login');
                }
            } finally {
                setIsLoading(false);  
            }
        };
    
        if (token) {
            fetchUserInfo();
        } else {
            setIsLoading(false); 
        }
    }, [url, token, navigate]);
    
    const contextValue = {
        isSidebarOpen,
        openSidebar,
        closeSidebar,
        url,
        token,
        setToken,
        user,
        setUser,
        userPermissions,
        isLoading
    }
    return (
        <SidebarContext.Provider value={contextValue}>
            {props.children}    
        </SidebarContext.Provider>
    );
};
