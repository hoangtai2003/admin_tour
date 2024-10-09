import { useContext, useEffect, useState } from "react";
import ListNewsAction from "./ListNewsAction"
import axios from "axios";
import '../table.css'
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import Pagination from "../Pagination";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SidebarContext } from "../../../context/SideBarContext";
const TABLE_HEADS = [
  "STT",
  "Tiêu đề",
  "Hình ảnh",
  "Danh mục",
  "Trạng thái",
  "Ngày đăng",
  "Hành động"

];
const ListNews = () => {
    const [newsletter, setNewsletter] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const { url } = useContext(SidebarContext)
    useEffect(() => {
        const fetchNews = async() => {
            try {
                const response = await axios.get(`${url}/news?page=${currentPage}`)
                setNewsletter(response.data.data)
                setTotalPages(response.data.totalPages) 
            } catch (error) {
                toast.error('Không có dữ liệu của tin tức');
            }
        }
        fetchNews()
    }, [currentPage])
    const handleDelete = (id) => {
        setNewsletter(newsletter.filter(news => news.id !== id))
    }
    const onPageChange = (newPage) => {
        if (newPage >=1 && newPage <= totalPages) {
            setCurrentPage(newPage)
        }
    }
    return (
      <section className="content-area-table">
        <ToastContainer />
        <div className="data-table-info">
            <h4 className="data-table-title">Danh sách tin tức</h4>
            <Link to="/add-news" className="create"><IoMdAdd className="create_icon"/> Tạo mới</Link>
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
                {newsletter?.map((news, index) => (
                    <tr key={news.id}>
                        <td className="index">{index + 1}</td>
                        <td>{news.news_name}</td>
                        <td>
                            <div className="image-container">
                                <img src={news.news_image} alt={news.name} style={{width: "40%", borderRadius: "10px"}}/>
                            </div>
                        </td>
                        <td>{news.newsCate.cate_name}</td>
                        <td>{news.news_status}</td>
                        <td>{news.news_date}</td>
                        <td className="dt-cell-action">
                            <ListNewsAction id={news.id} onDelete={handleDelete}/>
                        </td>
                    </tr>
                ))}
            </tbody>
          </table>
        </div>
                <Pagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={onPageChange}

                />
      </section>
    );
};

export default ListNews
