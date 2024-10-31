import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { toast } from 'react-toastify';
import { SidebarContext } from "../../../context/SideBarContext";
import ListHotelAction from "./ListHotelAction";
const ListHotel = () => {
    const [hotels, setHotel] = useState([])
    const { url } = useContext(SidebarContext)
    useEffect(() => {
        const fetchHotel = async () => {
            try {
                const response = await axios.get(`${url}/hotel`)
                setHotel(response.data.data)
            } catch (error) {
                toast.error('Đã có lỗi xảy ra!');
            }
        }
        fetchHotel();
    }, [url])
    const handleDelete = (slug) => {
        setHotel(hotels.filter(hotel => hotel.hotel_slug !== slug))
    }
    return (
        <section className="content-area-table">
            <div className="data-table-info">
                <h4 className="data-table-title">Danh sách khách sạn</h4>
                <Link to="/add-hotel" className="create"><IoMdAdd className="create_icon"/> Tạo mới</Link>
            </div>
            <div className="data-table-diagram">
                <table>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên khách sạn</th>
                            <th>Hình ảnh</th>
                            <th>Thông tin</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hotels?.map((hotel, index) => (
                            <tr key={hotel.id}>
                                <td className="index">{index + 1}</td>
                                <td>{hotel.hotel_name}</td>
                                <td>
                                    <div className="image-container">
                                        <img src={hotel.hotel_image} alt={hotel.hotel_name} style={{width: "40%", borderRadius: "10px"}}/>
                                    </div>
                                </td>
                                <td>
                                    <p><b>Địa điểm: </b>{hotel.hotelLocation.name}</p>
                                    <p><b>Địa chỉ: </b>{hotel.hotel_address}</p>
                                    <p><b>Điện thoại: </b>{hotel.hotel_phone}</p>
                                    <p><b>Giá từ: </b>{(hotel.hotel_price).toLocaleString('vi-VN')} vnđ</p>
                                </td>
                                <td className="dt-cell-action">
                                    <ListHotelAction slug={hotel.hotel_slug} onDelete={handleDelete}/>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default ListHotel;
