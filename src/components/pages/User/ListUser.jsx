import React from 'react'
import ListUserAction from "./ListUserAction"
import '../table.css'
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { BASE_URL } from '../../../utils/config';
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
    useEffect(() => {
        const fetchUsers = async() => {
            try {
                const response  = await axios.get(`${BASE_URL}/users`)
                setUser(response.data.data)
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        } 
        fetchUsers()
    }, [])
    const handleDelete = (id) => {
        setUser(users.filter(user => user.id !== id));
    }
    return (
        <section className="content-area-table">
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
                        <td>{index + 1}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td> {user.role === 0 ? "Administrator" : user.role === 1 ? "User" : "Customer"}</td>
                        <td>{user.status.data[1] === 0 ? "Hoạt động" : "Không hoạt động" }</td>
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
