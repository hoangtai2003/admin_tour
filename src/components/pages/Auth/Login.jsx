import React, { useContext, useState } from "react";
import { Container, Form, FormGroup, Button } from "reactstrap";
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../context/AuthContext'
import './auth.css'
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { SidebarContext } from "../../../context/SideBarContext";
const Login = () => {
    const [formData, setFormData] = useState({
        email: "",  
        password: ""  
    })
    const { url } = useContext(SidebarContext)
    const navigate = useNavigate()
    const { dispatch } = useContext(AuthContext)

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: 'LOGIN_START' });

        try {
            const response = await axios.post(`${url}/auth/login`, formData)
            dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
            navigate('/list-tour');
            toast.success("Login successfully")
        } catch (error) {
            dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
            toast.error("Login failed!");
        }
    }

    return (
        <Container className="login-container">
            <ToastContainer />
            <Form onSubmit={handleSubmit} className="login-form">
                <h2 className="login-title">Login</h2>
                <FormGroup>
                    <input
                        type='email'
                        id="email"
                        placeholder='Email'
                        required
                        onChange={handleChange}
                        className="login-input"
                    />
                </FormGroup>
                <FormGroup>
                    <input
                        type='password'
                        id="password"
                        placeholder='Password'
                        required
                        onChange={handleChange}
                        className="login-input"
                    />
                </FormGroup>
                <Button className='btn login-btn' type='submit'>Login</Button>
            </Form>
        </Container>
    )
}

export default Login;
