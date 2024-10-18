import React, { useContext, useState } from "react";
import { Container, Form, FormGroup, Button } from "reactstrap";
import { useNavigate } from 'react-router-dom'
import './auth.css'
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { SidebarContext } from "../../../context/SideBarContext";
const Login = () => {
    const [formData, setFormData] = useState({
        email: "",  
        password: ""  
    })
    const { url, setToken } = useContext(SidebarContext)
    const navigate = useNavigate()

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${url}/auth/login`, formData)
            if (response.data.success){
                setToken(response.data.token)
                localStorage.setItem("token_admin", response.data.token)
                navigate('/dashboard');
                toast.success("Đăng nhập thành công!")
            } else {
                toast.error("Đăng nhập thất bại")
            }
        } catch (error) {
            toast.error("Đăng nhập thất bại");
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
                        name="email"
                        placeholder='Email'
                        required
                        onChange={handleChange}
                        className="login-input"
                    />
                </FormGroup>
                <FormGroup>
                    <input
                        type='password'
                        name="password"
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
