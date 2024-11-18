import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const SidebarContext = createContext();

export const SidebarProvider = (props) => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [token, setToken] = useState("");
    const [user, setUser] = useState([]);
    const [requestApproved, setRequestApproved] = useState([])
    const [isLoading, setIsLoading] = useState(true); 
    const url = 'http://localhost:4000/api/v1';
    const navigate = useNavigate();
    
    const userPermissions = user?.userRole?.rolePermission?.map(permission => permission.slug) || [];

    const openSidebar = () => setSidebarOpen(true);
    const closeSidebar = () => setSidebarOpen(false);

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
            try {
                setIsLoading(true); 
                const response = await axios.get(`${url}/auth/users`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUser(response.data.data);
            } catch (error) {
                localStorage.removeItem("token_admin");
                setToken("");
                navigate('/login');
            } finally {
                setIsLoading(false); 
            }
        };

        if (token) {
            fetchUserInfo();
        }
    }, [token, url, navigate]);
    useEffect(() => {
        const fetchRequestApproved = async () => {
            try {
                setIsLoading(true); 
                const response = await axios.get(`${url}/users/request/getAllApproved`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setRequestApproved(response.data.data);
            } catch (error) {
                localStorage.removeItem("token_admin");
                setToken("");
                navigate('/login');
            } finally {
                setIsLoading(false); 
            }
        };

        if (token) {
            fetchRequestApproved();
        }
    }, [token, url, navigate]);

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
        isLoading,
        setRequestApproved,
        requestApproved
    };

    return (
        <SidebarContext.Provider value={contextValue}>
            {props.children}
        </SidebarContext.Provider>
    );
};
