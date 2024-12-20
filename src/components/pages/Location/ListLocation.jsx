import ListLocationAction from "./ListLocationAction"
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import '../table.css'
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import Pagination from "../Pagination";
import { toast } from 'react-toastify';
import { SidebarContext } from "../../../context/SideBarContext";
const TABLE_HEADS = [
  "STT",
  "Tên địa điểm",
  "Hình ảnh",
  "Trạng thái",
  "Hành Động"
];
const ListLocation = () => {
    const [locations, setLocations] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const { url } = useContext(SidebarContext)
    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await axios.get(`${url}/location?page=${currentPage}`)
                setLocations(response.data.data)
                setTotalPages(response.data.totalPages)
            } catch (error) {
                toast.error('Error fetching locations');
            }
        }
        fetchLocations();
    }, [currentPage, url])
    const handleDelete = (id) => {
        setLocations(locations.filter(location => location.id !== id))
    }
    const onPageChange = (newPage) => {
        if (newPage >=1 && newPage <= totalPages) {
            setCurrentPage(newPage)
        }
    }
    return (
      <section className="content-area-table">
        <div className="data-table-info">
            <h4 className="data-table-title">Danh sách địa điểm</h4>
            <Link to="/add-location" className="create"><IoMdAdd className="create_icon"/> Tạo mới</Link>
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
                {locations?.map((location, index) => (
                    <tr key={location.id}>
                        <td className="index">{index + 1}</td>
                        <td>{location.name}</td>
                        <td>
                            <div className="image-container">
                                <img src={location.location_img} alt={location.name} style={{width: "30%", borderRadius: "10px"}}/>
                            </div>
                        </td>
                        <td>{location.status}</td>
                        <td className="dt-cell-action">
                            <ListLocationAction id={location.id} onDelete={handleDelete}/>
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

export default ListLocation;
