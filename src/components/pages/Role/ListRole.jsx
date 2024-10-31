import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
import { toast } from 'react-toastify';
import { SidebarContext } from "../../../context/SideBarContext";
import { FiEdit3 } from "react-icons/fi";

const ListRole = () => {
    const { url } = useContext(SidebarContext)
    const [ roleUser, setRoleUser ] = useState([])
    useEffect(() => {
        const fetchRole = async() => {
            try {
                const response = await axios.get(`${url}/role`)
                setRoleUser(response.data.data)
            } catch (error) {
                toast.error('Đã có lỗi xảy ra!');
            }
        }
        fetchRole()
    }, [url])

    
    return (
        <section className="content-area-table">
            <div className="data-table-info">
                <h4 className="data-table-title">Danh sách vai trò</h4>
                <Link to="/add-role" className="create"><IoMdAdd className="create_icon"/> Tạo mới</Link>
            </div>
            <div className="data-table-diagram">
                <table>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên vai trò</th>
                            <th>Danh sách quyền</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roleUser?.map((role, index) => (
                            <tr key={role.id}>
                                <td className="index">{index + 1}</td>
                                <td>{role.name}</td>
                                <td style={{ padding: '10px' }}>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                        {role.rolePermission?.map((permission, index) => (
                                            <ul key={index} style={{ 
                                                background: "#26c7c7", 
                                                padding: "4px", 
                                                listStyleType: "none", 
                                                textAlign: "center", 
                                                borderRadius: "5px", 
                                                fontSize: '14px', 
                                                width: '18%', 
                                                marginBottom: '10px',
                                            }}>
                                                <li>{permission.name}</li>
                                            </ul>
                                        ))}
                                    </div>
                                </td>
                                <td style={{display: "flex", justifyContent: "center"}}>
                                    <button type='button'><div className='icon_delete'><AiOutlineDelete /></div></button>
                                    <Link to={`/edit-role/${role.id}`} type='button'><div className='icon_edit'><FiEdit3  /></div></Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default ListRole;
