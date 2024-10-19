import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaSave } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import Select from 'react-select'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SidebarContext } from "../../../context/SideBarContext";
const AddUser  = () => {
    const navigate = useNavigate()
    const { url } = useContext(SidebarContext)
    const [ role, setRole ] = useState([])
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phone: '',
        status: '',
        password: ''
    })
    const status = [
        { value: 'Hoạt động', label: 'Hoạt động' },
        { value: 'Ngừng hoạt động', label: 'Ngừng hoạt động' },
    ];
    useEffect(() => {
        const fetchRole = async() => {
            const response = await axios.get(`${url}/role`)
            const roleData = response.data.data.map(role => ({
                value: role.id,
                label: role.name
            }))
            setRole(roleData)
        }
        fetchRole()
    }, [url])
    const handleChange = async(e) => {
        const {name, value} = e.target;
        setFormData(prev => ({ ...prev, [name]: value }))
    }
    const handleStatusChange = async(selectedOption) => {
        setFormData(prev => ({...prev, status: selectedOption ? selectedOption.value : ''}))
    }
    const handleRoleChange = async(selectedOption) => {
        setFormData(prev => ({...prev, role_id: selectedOption ? selectedOption.value : ''}))
    }
    const handleSubmit =  async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${url}/users`, formData)
            if (response.status !== 200) {
                return toast.error(response.data.message);
            }
            navigate('/list-user')
            toast.success("Create user successfully")
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="tour-form-container">
                <div className="tour-form-left">
                    <div className="form-group">
                        <label>Họ Tên <span>*</span></label>
                        <input type="text" name="username" value={formData.username} required onChange={handleChange}></input>
                    </div>
                    <div className="form-group">
                        <label>Email <span>*</span></label>
                        <input type="email" name="email" required value={formData.email} onChange={handleChange}></input>
                    </div>
                    <div className="form-group">
                        <label>Số điện thoại <span>*</span></label>
                        <input type="text" name="phone" required value={formData.phone} onChange={handleChange}></input>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Vai trò <span>*</span></label>
                            <Select options={role} onChange={handleRoleChange}/>
                        </div>
                        <div className="form-group">
                            <label>Trạng thái <span>*</span></label>
                            <Select options={status} onChange={handleStatusChange}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Password <span>*</span></label>
                        <input type="password" name="password" value={formData.password} required onChange={handleChange}></input>
                    </div>
                    <div className="form-actions">
                        <button type="submit"><FaSave className='icon' />Lưu dữ liệu</button>
                        <button type="button" ><GrPowerReset className='icon' /> Reset</button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default AddUser