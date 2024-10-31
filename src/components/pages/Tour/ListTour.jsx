import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import LisTourAction from "./ListTourAction";
import "../table.css";
import { IoMdAdd } from "react-icons/io";
import Pagination from "../Pagination";
import { toast } from 'react-toastify';
import { SidebarContext } from "../../../context/SideBarContext";
const ListTour = () => {
    const [tours, setTours] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const { url } = useContext(SidebarContext)
    useEffect(() => {
        const fetchTours = async () => {
            try {
                const response = await axios.get(`${url}/tours?page=${currentPage}`);
                setTours(response.data.data);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                toast.error('Error fetching tours');
            }
        };
        fetchTours();
    }, [currentPage, url]);

    const handleDelete = (id) => {
        setTours(tours.filter(tour => tour.id !== id)); 
    };

    const onPageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <section className="content-area-table">
            <div className="data-table-info">
                <h4 className="data-table-title">Danh sách Tour</h4>
                <Link to="/add-tour" className="create"><IoMdAdd className="create_icon"/> Tạo mới</Link>
            </div>
            <div className="data-table-diagram">
                <table>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tiêu đề</th>
                            <th>Hình ảnh</th>
                            <th>Lịch trình / Giá</th>
                            <th>Thông tin / Địa điểm</th>
                            <th>Hành Động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tours?.map((tour, index) => (
                            <tr key={tour.id}>
                                <td className="index">{index + 1}</td>
                                <td>{tour.name}</td>
                                <td>
                                    <div className="image-container">
                                        <img src={tour.tourImage[0]?.image_url} alt={tour.name}  style={{width: "80%", borderRadius: "10px"}} />
                                    </div>
                                </td>
                                <td>
                                    <p><b>Hành trình: </b>{tour.duration}</p>
                                    <p><b>Giá tiền: </b>{tour.price.toLocaleString('vi-VN')} vnđ</p>
                                </td>
                                <td>
                                    <p><b>Địa điểm: </b>
                                        {tour.locations.map((location, i) => (
                                            <span key={i}>{location.name}{i < tour.locations.length - 1 ? ' - ' : ''}</span>
                                        ))}
                                    </p>
                                    <p><b>Điểm xuất phát: </b>{tour.departure_city}</p>
                                </td>
                                <td className="dt-cell-action">
                                    <LisTourAction id={tour.id}  onDelete={handleDelete}/>
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

export default ListTour;
