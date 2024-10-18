import { useContext, useEffect, useState } from "react";
import ListCategoryAction from "./ListCategoryAction"
import axios from "axios";
import '../table.css'
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SidebarContext } from "../../../context/SideBarContext";
const TABLE_HEADS = [
  "STT",
  "Tên danh mục",
  "Trạng thái",
  "Hành Động"
];
const ListCategory = () => {
    const [category, setCategory] = useState([])
    const {url} = useContext(SidebarContext)
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
    }, [])
    const handleDelete = (id) => {
        setCategory(category.filter(cate => cate.id !== id))
    }
    return (
      <section className="content-area-table">
        <ToastContainer />
        <div className="data-table-info">
            <h4 className="data-table-title">Danh sách danh mục</h4>
            <Link to="/add-category" className="create"><IoMdAdd className="create_icon"/> Tạo mới</Link>
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
