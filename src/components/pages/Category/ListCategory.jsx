import { useContext, useEffect, useState } from "react";
import ListCategoryAction from "./ListCategoryAction"
import axios from "axios";
import '../table.css'
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { toast } from 'react-toastify';
import { SidebarContext } from "../../../context/SideBarContext";
const ListCategory = () => {
    const [category, setCategory] = useState([])
    const { url } = useContext(SidebarContext)
   
    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await axios.get(`${url}/category`)
                setCategory(response.data.data)
            } catch (error) {
                toast.error('Đã có lỗi xảy ra!');
            }
        }
        fetchCategory();
    }, [url])
    const handleDelete = (id) => {
        setCategory(category.filter(cate => cate.id !== id))
    }
    return (
        <section className="content-area-table">
            <div className="data-table-info">
                <h4 className="data-table-title">Danh sách danh mục</h4>

                <Link to="/add-category" className="create"><IoMdAdd className="create_icon"/> Tạo mới</Link>
             
            </div>
            <div className="data-table-diagram">
                <table>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên danh mục</th>
                            <th>Trạng thái</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {category?.map((cate, index) => (
                            <tr key={cate.id}>
                                <td className="index">{index + 1}</td>
                                <td>{cate.cate_name}</td>
                                <td>{cate.cate_status}</td>
                                <td className="dt-cell-action">
                                    <ListCategoryAction id={cate.id} onDelete={handleDelete}/>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default ListCategory;
