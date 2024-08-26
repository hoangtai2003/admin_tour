import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import LisTourAction from "./ListTourAction";
import "../table.css";
import { BASE_URL } from "../../../utils/config";
import { IoMdAdd } from "react-icons/io";
import Pagination from "../Pagination";
const TABLE_HEADS = [
  "STT",
  "Tiêu đề",
  "Hình ảnh",
  "Lịch trình / Giá",
  "Thông tin / Địa điểm",
  "Hành Động"
];

const ListTour = () => {
    const [tours, setTours] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchTours = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/tours?page=${currentPage}`);
                setTours(response.data.data);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error('Error fetching tours:', error);
            }
        };
        fetchTours();
    }, [currentPage]);

    const stripHTML = (html) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    };

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
                            {TABLE_HEADS?.map((th, index) => (
                                <th key={index}>{th}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {tours?.map((tour, index) => (
                            <tr key={tour.id}>
                                <td>{index + 1}</td>
                                <td>{tour.name}</td>
                                <td>
                                    <div className="image-container">
                                        <img src={tour.tour_image} alt={tour.name} className="image" />
                                    </div>
                                </td>
                                <td>
                                    <p><b>Hành trình: </b>{tour.duration}</p>
                                    {tour.tourChildren.length > 0 && (
                                        <>
                                        <p><b>Số người: </b>{tour.tourChildren[0].total_seats}</p>
                                        <p><b>Giá người lớn: </b>{tour.tourChildren[0].price_adult} vnd</p>
                                        <p><b>Giá trẻ em: </b>{tour.tourChildren[0].price_child} vnd</p>
                                        </>
                                    )}
                                </td>
                                <td>
                                    <p><b>Địa điểm: </b>
                                        {tour.tourLocations.map((tourLocation, i) => (
                                            <span key={i}>{tourLocation.location.name}{i < tour.tourLocations.length - 1 ? ' - ' : ''}</span>
                                        ))}
                                    </p>
                                    <p><b>Di chuyển: </b>{tour.transportations}</p>
                                    <p><b>Điểm xuất phát: </b>{tour.departure_city}</p>
                                    {tour.tourChildren.length > 0 && (
                                        <>
                                        <p><b>Ngày đi: </b>{tour.tourChildren[0].start_date}</p>
                                        <p><b>Ngày về: </b>{tour.tourChildren[0].end_date}</p>
                                        </>
                                    )}
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
