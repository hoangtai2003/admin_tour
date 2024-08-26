import React, { useContext, useState } from "react";
import { Container, Form, FormGroup, Button } from "reactstrap";
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../context/AuthContext'
import { BASE_URL } from '../../../utils/config'
import './auth.css'
import axios from "axios";
import { toast } from "react-toastify";
const Login = () => {
    const [formData, setFormData] = useState({
        email: "",  
        password: ""  
    })

    const navigate = useNavigate()
    const { dispatch } = useContext(AuthContext)

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: 'LOGIN_START' });

        try {
            const response = await axios.post(`${BASE_URL}/auth/login`, formData)

            if (response.status !== 200) {
                return alert(response.data.message);
            }
            dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
            navigate('/list-tour');
            toast.success("Login successfully")
        } catch (error) {
            dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
        }
    }

    return (
        <Container className="login-container">
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
