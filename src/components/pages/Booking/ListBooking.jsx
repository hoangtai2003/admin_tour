import React, { useEffect, useState } from "react";
import axios from "axios";
import "../table.css"
import { BASE_URL } from "../../../utils/config";
import Pagination from "../Pagination";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Form } from 'react-bootstrap'
const TABLE_HEADS = [
  "STT",
  "Tên tour / Mã tour",
  "Thông tin khách hàng",
  "Dữ liệu tour",
  "Hình thức",
  "Trạng thái",
  "Hành động"
];

const ListBooking = () => {
    const [booking, setBooking] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const fetchBooking = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/booking?page=${currentPage}`);
            setBooking(response.data.data);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            toast.error('Error fetching tours');
        }
    };
    useEffect(() => {
        fetchBooking();
    }, [currentPage]);
    const statusHandler = async (event, bookingId) => {
        try {
            const response = await axios.post(`${BASE_URL}/booking/${bookingId}/status`, {
                status: event.target.value
            });
            if (response.data.success) {
                toast.success("Update status successfully");
                fetchBooking();
            }
        } catch (error) {
            toast.error("Failed to update status. Try again");
        }
    };
    
    const onPageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <section className="content-area-table">
            <ToastContainer />
            <div className="data-table-info">
                <h4 className="data-table-title">Danh sách đặt Tour</h4>
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
                        {booking?.map((book, index) => (
                            <tr key={book.id}>
                                <td>{index + 1}</td>
                                <td>
                                    <p>{book?.bookingTourChild?.tour?.name}</p>
                                    <p><b>Mã Tour: </b>{book?.bookingTourChild?.tour_code}</p>
                                </td>
                                <td>
                                    <p><b>Họ và tên: </b>{book?.full_name}</p>
                                    <p><b>Email: </b>{book?.email}</p>
                                    <p><b>Số điện thoại: </b>{book?.phone_number}</p>
                                    <p><b>Địa chỉ: </b>{book?.address}</p>
                                </td>
                                <td>
                                    <p><b>Số người lớn: </b>{book.number_of_adults} - <b>Thành tiền: </b></p>
                                    <p><b>Số trẻ em: </b>{book.number_of_child} - <b>Thành tiền: </b></p>
                                    <p><b>Số trẻ nhỏ: </b>{book.number_of_toddler} - <b>Thành tiền: </b></p>
                                    <p><b>Số trẻ sơ sinh: </b>{book.number_of_baby} - <b>Thành tiền: </b></p>
                                    <p><b>Tổng tiền: </b>{book.total_price.toLocaleString('vi-VN')} vnđ</p>
                                    <p><b>Mã booking: </b>{book.booking_code}</p>
                                    <p><b>Điểm đón: </b>{book?.bookingTourChild?.tour?.departure_city} </p>
                                    <p><b>Ghi chú: </b>{book.booking_note}</p>
                                </td>
                                <td>
                                    {/* <p><b>Họ và tên: </b>{book.bookingUser.username}</p>
                                    <p><b>Email: </b>{book.bookingUser.email}</p>
                                    <p><b>Số điện thoại: </b>{book.bookingUser.phone}</p>
                                    <p><b>Địa chỉ: </b>{book.bookingUser.address}</p> */}
                                </td>
                                <td >
                                    <div className={
                                        book.status === "Đang chờ xử lý" ? "gray":
                                        book.status === "Đã xác nhận" ? "green" :
                                        book.status === "Đã thanh toán" ? "aqua" :
                                        book.status === "Hoàn thành" ? "blue" :
                                        book.status === "Hủy bỏ" ? "red" : ""
                                } style={{borderRadius: "5px", display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5px', textAlign: 'center'}}>
                                    {book.status}
                                    </div>
                                    
                                </td>
                                <td>
                                <Form.Select onChange={(event) => statusHandler(event, book.id)} style={{padding:  '5px', borderRadius: '5px'}}>
                                    <option value="" selected disabled>Action</option>
                                    <option value="Đã xác nhận">Đã xác nhận</option>
                                    <option value="Đã thanh toán">Đã thanh toán</option>
                                    <option value="Hoàn thành">Hoàn thành</option>
                                    <option value="Hủy bỏ">Hủy bỏ</option>
                                    <option value="Nhắc nhỏ">Nhắc nhở</option>
                                </Form.Select>


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

export default ListBooking;
