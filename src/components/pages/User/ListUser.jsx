import React, { useContext } from 'react'
import { AiOutlineDelete } from "react-icons/ai";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SidebarContext } from '../../../context/SideBarContext';
import Select from 'react-select'
const ListUser = () =>  {
    const [users, setUser] = useState([])
    const { url } = useContext(SidebarContext)
    const [ role, setRole ] = useState([])
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
    const status = [
        { value: 'Hoạt động', label: 'Hoạt động' },
        { value: 'Ngừng hoạt động', label: 'Ngừng hoạt động' },
    ];
    const fetchUsers = async() => {
        try {
            const response  = await axios.get(`${url}/users`)
            setUser(response.data.data)
        } catch (error) {
            toast.error('Error fetching users');
        }
    } 
    useEffect(() => {
        fetchUsers()
    }, [url])
    const handleRoleChange = async(selectedOption, userId) => {
        const updatedRole = selectedOption ? selectedOption.value : "";
        try {
            await axios.put(`${url}/users/${userId}`, { role_id: updatedRole })
            setUser((prevUsers) => 
                prevUsers.map((user) => 
                    user.id === userId ? { ...user, role_id: updatedRole } : user
                )
            )
            toast.success("Cập nhập thành công !");
        } catch (error) {
            toast.error("Đã có lỗi xảy ra. Vui lòng thử lại !");
        }
    }
    const handleStatusChange = async(selectedOption, userId) => {
       const updatedStatus = selectedOption ? selectedOption.value : "";
        try {
            await axios.put(`${url}/users/${userId}`, { status: updatedStatus })
            setUser((prevUsers) => 
                prevUsers.map((user) => 
                    user.id === userId ? { ...user, status: updatedStatus } : user
                )
            )
            toast.success("Cập nhập thành công !");
        } catch (error) {
            toast.error("Đã có lỗi xảy ra. Vui lòng thử lại !");
        }
    }
    const handleDeleteUser = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (!confirmDelete) return;

        try {
            const response  = await axios.delete(`${url}/users/${id}`);

            if (response.status === 200) {
                toast.success("Xóa người dùng thành công");
                fetchUsers()
            } else {
                toast.error("Không thể xóa người dùng");
            }
        } catch (error) {
            toast.error("Đã có lỗi xảy ra. Vui lòng thử lại !");
        }
    };
    return (
        <section className="content-area-table">
            <ToastContainer />
            <div className="data-table-info">
                <h4 className="data-table-title">Danh sách người dùng</h4>
                <Link to="/add-user" className="create"><IoMdAdd className="create_icon"/> Tạo mới</Link>
            </div>
            <div className="data-table-diagram">
                <table>
                    <thead>
                        <tr>
                           <th>STT</th>
                           <th>Họ tên</th>
                           <th>Email</th>
                           <th>Số điện thoại</th>
                           <th>Vai trò</th>
                           <th>Trạng thái</th>
                           <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((user, index) => (
                            <tr key={index}>
                                <td className='index'>{index + 1}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>
                                    <Select 
                                        options={role} 
                                        onChange={(selectedOption) => handleRoleChange(selectedOption, user.id)}
                                        value={role.find(option => option.value === user.role_id)}
                                    />
                                </td>
                                <td>
                                    <Select 
                                        options={status} 
                                        onChange={(selectedOption) => handleStatusChange(selectedOption, user.id)}
                                        value={status.find(option => option.value === user.status)}
                                        
                                    />
                                </td>
                                <td style={{display: "flex", justifyContent: "center"}}>
                                    <button type='button' onClick={() => handleDeleteUser(user.id)}><div className='icon_delete'><AiOutlineDelete /></div></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
      </section>
    )
}

export default ListUser
