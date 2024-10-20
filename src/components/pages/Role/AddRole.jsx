import React, { useContext, useEffect, useState } from 'react'
import Select from 'react-select';
import { FaSave } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import axios from 'axios';
import { SidebarContext } from '../../../context/SideBarContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const AddRole = () => {
    const [permission, setPermission] = useState([]);
    const { url } = useContext(SidebarContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        permission_id: []
    });

    useEffect(() => {
        const fetchPermission = async () => {
            const response = await axios.get(`${url}/role/all-permission`);
            const dataPermission = response.data.data.map(permission => ({
                value: permission.id,
                label: permission.name
            }));
            setPermission(dataPermission);
        };
        fetchPermission();
    }, [url]);

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (selectedOptions) => {
        const selectedValues = selectedOptions ? selectedOptions.map(option => option.value) : [];
        setFormData(prev => ({ ...prev, permission_id: selectedValues }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post(`${url}/role`, {
                name: formData.name,
                permission_id: formData.permission_id 
            }, {
                headers: { 'Content-Type': 'application/json' }
            });
    
            if (response.status !== 200) {
                return alert(response.data.message);
            }
    
            navigate("/list-role");
            toast.success("Role created successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };
    return (
        <form onSubmit={onSubmit}>
            <div className="tour-form-container">
                <div className='tour-form-left'>
                    <div className='form-row'>
                        <div className="form-group">
                            <label>Tên vai trò <span>*</span></label>
                            <input
                                type="text"
                                name="name"
                                required
                                value={formData.name}  
                                onChange={handleChange}  
                            />

                        </div>
                    </div>
                    <div className="form-group">
                        <label>Phân quyền <span>*</span></label>
                        <Select
                            className="basic-multi-select"
                            classNamePrefix="select"
                            isMulti
                            options={permission}
                            onChange={handleSelectChange}  
                        />
                    </div>
                    <div className="form-actions">
                        <button type="submit"><FaSave className='icon' />Lưu dữ liệu</button>
                        <button type="button" ><GrPowerReset className='icon' /> Reset</button>
                    </div>
                </div>
            </div>
        </form>
    );
};


export default AddRole
