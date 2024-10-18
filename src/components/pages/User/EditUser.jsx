import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from 'react-select'
import { FaSave } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import { toast } from "react-toastify";
import { SidebarContext } from "../../../context/SideBarContext";
const EditUser = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const { url } = useContext(SidebarContext)
    const [formData, setFormData] = useState({
        status: '',
        role: ''
    })
    const role = [
        { value: 'Administrator', label: 'Administrator' },
        { value: 'Nhân viên', label: 'Nhân viên' },
        { value: 'Khách hàng', label: 'Khách hàng' }  
    ]
    const status = [
        { value: 'Hoạt động', label: 'Hoạt động' },
        { value: 'Ngừng hoạt động', label: 'Ngừng hoạt động' },
    ];
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${url}/users/${id}`)
                const userData = response.data.data

                setFormData({
                    status: userData.status,
                    role: userData.role
                })
            } catch (error) {
                toast.error('Error fetching user data');
            }
        }
        fetchUserData()
    }, [id, url])
    const handleRoleChange = (selectedOption) => {
        setFormData(prev => ({ ...prev, role: selectedOption ? selectedOption.value : ''}))
    }
    const handleStatusChange = (selectedOption) => {
        setFormData(prev => ({ ...prev, status: selectedOption ? selectedOption.value : ''}))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response  = await axios.put(`${url}/users/${id}`, formData)
            if (response.status !== 200) {
                return alert(response.data.message);
            }
            navigate("/list-user")
            toast.success("Edit user successfully")
        } catch (error) {
            alert(error.response?.data?.message || error.message);
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="tour-form-container">
                <div className="tour-form-left">
                    <div className="form-row">
                        <div className="form-group">
                            <label>Vai trò <span>*</span></label>
                            <Select 
                                options={role} 
                                onChange={handleRoleChange}
                                value={role.find(option => option.value === formData.role)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Trạng thái <span>*</span></label>
                            <Select 
                                options={status} 
                                onChange={handleStatusChange}
                                value={status.find(option => option.value === formData.status)}
                            />
                        </div>
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

export default EditUser