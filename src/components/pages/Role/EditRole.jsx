import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import Select from 'react-select';
import { SidebarContext } from '../../../context/SideBarContext';
import { FaSave } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
const EditRole = () => {
    const [permission, setPermission] = useState([]);
    const { url } = useContext(SidebarContext);
    const { id } = useParams()
    const [selectedPermission, setSelectedPermission] = useState([]);
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
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

    useEffect(() => {
        const fetchRole = async() => {
            try {
                const response = await axios.get(`${url}/role/${id}`)
                const dataRole = response.data.data
                const permissionIds = dataRole.rolePermission.map(permission => permission.RolePermissions.permission_id)
                setFormData({
                    permission_id: permissionIds || []
                })
                const selectedOptions = dataRole.rolePermission.map(permission => ({
                    value: permission.RolePermissions.permission_id,
                    label: permission.name
                }))
                setSelectedPermission(selectedOptions);
            } catch (error) {
                toast.error('Đã có lỗi xảy ra. Vui lòng thử lại!');
            }   
        }
        fetchRole()
    }, [url, id])
    const handleSelectChange = (selectedOptions) => {
        setSelectedPermission(selectedOptions);
        const ids = selectedOptions.map(option => option.value);
        setFormData(prevState => ({
            ...prevState,
            permission_id: ids
        }));
    };
    const onSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.put(`${url}/role/${id}`, {
                permission_id: formData.permission_id 
            }, {
                headers: { 'Content-Type': 'application/json' }
            });
    
            if (response.status !== 200) {
                return alert(response.data.message);
            }
    
            navigate("/list-role");
            toast.success("Cập nhật vai trò thành công");
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };
    return (
        <form onSubmit={onSubmit}>
            <div className="tour-form-container">
                <div className='tour-form-left'>
                    <div className="form-group">
                        <label>Phân quyền <span>*</span></label>
                        <Select
                            className="basic-multi-select"
                            classNamePrefix="select"
                            isMulti
                            options={permission}
                            onChange={handleSelectChange}
                            value={selectedPermission}
                        />
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

export default EditRole
