import React, { useContext, useState } from 'react'
import { Button, Container, Form, FormGroup } from 'reactstrap'
import { SidebarContext } from '../../../context/SideBarContext'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify';
const ChangePassword = () => {
    const { url } = useContext(SidebarContext)
    const { id } = useParams()
    const navigate = useNavigate()
    const [editPassword, setEditPassword] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })
    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setEditPassword(prev => ({...prev, [name]:value}))
    }
    const editPasswordSubmit = async(e) => {
        e.preventDefault()
        try {
            const response = await axios.put(`${url}/users/updatePassword/${id}`, editPassword)
            if (response.data.success){
                toast.success("Thay đổi mật khẩu thành công !");
            }
            navigate("/login")
        } catch (error) {
            toast.error("Đã có lỗi xảy ra vui lòng thử lại")
        }
        
    }
    return (
        <Container className="login-container">
            <Form  className="login-form" onSubmit={editPasswordSubmit}>
                <h2 className="login-title">Thay đổi mật khẩu</h2>
                <FormGroup>
                    <input
                        type='password'
                        name="currentPassword"
                        placeholder='Nhập mật khẩu của bạn'
                        required
                        className="login-input"
                        value={editPassword.currentPassword} 
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <input
                        type='password'
                        name="newPassword"
                        placeholder='Nhập mật khẩu mới của bạn'
                        required
                        className="login-input"
                        value={editPassword.newPassword} 
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <input
                        type='password'
                        name="confirmPassword"
                        placeholder='Xác nhận mật khẩu'
                        required
                        className="login-input"
                        value={editPassword.confirmPassword} onChange={handleChange}
                    />
                </FormGroup>
                <Button className='btn login-btn' type='submit'>Thay đổi</Button>
            </Form>
        </Container>
    )
}

export default ChangePassword
