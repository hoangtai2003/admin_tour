import React, { useContext } from 'react'
import ListUserAction from "./ListUserAction"
import '../table.css'
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SidebarContext } from '../../../context/SideBarContext';
const TABLE_HEADS = [
    "STT",
    "Họ tên",
    "Email",
    "Phone",
    "Vai trò",
    "Trạng thái",
    "Hành động"
];
const ListUser = () =>  {
    const [users, setUser] = useState([])
    const { url } = useContext(SidebarContext)
    useEffect(() => {
        const fetchUsers = async() => {
            try {
                const response  = await axios.get(`${url}/users`)
                setUser(response.data.data)
            } catch (error) {
                toast.error('Error fetching users');
            }
        } 
        fetchUsers()
    }, [url])
    const handleDelete = (id) => {
        setUser(users.filter(user => user.id !== id));
    }
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
                    {TABLE_HEADS?.map((th, index) => (
                    <th key={index}>{th}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                    {users?.map((user, index) => (
                        <tr key={user.id}>
                            <td className='index'>{index + 1}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td> {user.role}</td>
                            <td>{user.status }</td>
                            <td className="dt-cell-action">
                                <ListUserAction id={user.id} onDelete={handleDelete}/>
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
