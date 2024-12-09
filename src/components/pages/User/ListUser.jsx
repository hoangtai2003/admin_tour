import React, { useCallback, useContext } from 'react'
import { AiOutlineDelete } from "react-icons/ai";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SidebarContext } from '../../../context/SideBarContext';
import Select from 'react-select'
import { FaCheckCircle } from "react-icons/fa";
import { HiXCircle } from "react-icons/hi";
const ListUser = () =>  {
    const [users, setUser] = useState([])
    const { url } = useContext(SidebarContext)
    const status = [
        { value: 'Hoạt động', label: 'Hoạt động' },
        { value: 'Ngừng hoạt động', label: 'Ngừng hoạt động' },
    ];
    const fetchUsers = useCallback(async() => {
        try {
            const response  = await axios.get(`${url}/users`)
            setUser(response.data.data)
        } catch (error) {
            toast.error('Error fetching users');
        }
    }, [url])
    useEffect(() => {
        fetchUsers()
    }, [fetchUsers])
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
    const handleRefuseUser = async (userId) => {
        try {
            const response = await axios.delete(`${url}/users/refuse/${userId}`);
            
            if (response.data.success) {
                toast.success('Người dùng đã bị từ chối và xóa thành công!');
                fetchUsers(); 
            } else {
                toast.error('Không thể từ chối người dùng. Vui lòng thử lại!');
            }
        } catch (error) {
            toast.error('Đã có lỗi xảy ra khi từ chối người dùng');
        }
    };
    
    const handleApproveUser = async (userId) => {
        try {
            await axios.put(`${url}/users/allow/${userId}`);
            setUser((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === userId ? { ...user, status: "Hoạt động" } : user
                )
            );
            toast.success("Cập nhật trạng thái thành công và email đã được gửi!");
        } catch (error) {
            toast.error("Đã có lỗi xảy ra. Vui lòng thử lại!");
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
                                   {user.userRole.name}
                                </td>
                                <td>
                                    {user.userRole.name === "Hướng dẫn viên" ? (
                                        <div>
                                            {user.status}
                                        </div>
                                    ) : (
                                        <Select 
                                            options={status} 
                                            onChange={(selectedOption) => handleStatusChange(selectedOption, user.id)}
                                            value={status.find(option => option.value === user.status)}
                                        />
                                    )}
                                    
                                </td>
                                {user.userRole.name === "Hướng dẫn viên" ? (
                                    user.status === "Ngừng hoạt động" ? (
                                        <td style={{display: "flex", justifyContent: "center"}}>
                                            <button type='button' onClick={() => handleRefuseUser(user.id)}>
                                                <div className='icon_refuse'><HiXCircle /></div>
                                            </button>
                                            <button type='button' onClick={() => handleApproveUser(user.id)}>
                                                <div className='icon_allow'><FaCheckCircle /></div>
                                            </button>
                                        </td>
                                    ) : (
                                        <td style={{display: "flex", justifyContent: "center"}}>
                                            <button type='button' onClick={() => handleDeleteUser(user.id)}>
                                                <div className='icon_delete'><AiOutlineDelete /></div>
                                            </button>
                                        </td>
                                    )
                                    ) : (
                                        <td style={{display: "flex", justifyContent: "center"}}>
                                            <button type='button' onClick={() => handleDeleteUser(user.id)}>
                                                <div className='icon_delete'><AiOutlineDelete /></div>
                                            </button>
                                        </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
      </section>
    )
}

export default ListUser
