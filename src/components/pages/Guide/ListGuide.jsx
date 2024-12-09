import React, { useCallback, useContext, useEffect, useState } from 'react'
import { SidebarContext } from '../../../context/SideBarContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const ListGuide = () => {
    const {url } = useContext(SidebarContext)
    const [requests, setRequests] = useState([])
    const fetchAllRequest = useCallback(async() => {
        const response = await axios.get(`${url}/users/request/getAll`)
        setRequests(response.data.data)
    }, [url])
    useEffect(() => {
        fetchAllRequest()
    }, [fetchAllRequest])
    const statusHandler = async(event, requestId) => {
        try {
            const response = await axios.put(`${url}/users/request/updateStatus/${requestId}`, {
                status: event.target.value
            })
            if (response.data.success) {
                toast.success("Cập nhật trạng thái thành công");
                fetchAllRequest()
            }
        } catch (error) {
            toast.error("Đã có lỗi xảy ra. Vui lòng thử lại !");
        }
    }
    return (
        <section className="content-area-table">
            <div className="data-table-info">
                <h4 className="data-table-title">Danh sách hướng dẫn viên đăng ký tour</h4>
            </div>
            <div className="data-table-diagram">
                <table>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Thông tin hướng dẫn viên </th>
                            <th>Thông tin tour đăng ký</th>
                            <th>Trạng thái</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((request, index) => (
                            <tr key={request.id}>
                                <td>{index + 1}</td>
                                <td>
                                    <p><b>Họ và tên hướng dẫn viên: </b>{request.tourRequestsUser.username}</p>
                                    <p><b>Địa chỉ Email: </b>{request.tourRequestsUser.email}</p>
                                    <p><b>Số điện thoại: </b>{request.tourRequestsUser.phone}</p>
                                    <p><b>Ngày sinh: </b>{request.tourRequestsUser.dateBirthday}</p>
                                    <p><b>Giới tính: </b>{request.tourRequestsUser.gender}</p>
                                    <p><b>Khu vực làm việc: </b>Thành Phố {request.tourRequestsUser.userLocation.name}</p>
                                </td>
                                <td>
                                    <p><b>Mã tour: </b>{request.tourRequestsChild.tour_code}</p>
                                    <p><b>Ngày khởi hành: </b>{new Date(request.tourRequestsChild.start_date).toLocaleDateString("vi-VN")}</p>
                                </td>
                                <th>
                                <div className={
                                        request.status === "Phê duyệt" ? "green" : 
                                        request.status === "Từ chối" ? "red" :
                                        request.status === "Đang chờ" ? "pink" : ""
                                } style={{borderRadius: "5px", display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5px', textAlign: 'center'}}>
                                    {request.status}
                                    </div>
                                </th>
                                <td>
                                    <select onChange={(event) => statusHandler(event, request.id)} style={{padding: '5px', borderRadius: '5px', width: "90%"}}>
                                        <option value="" selected disabled>Action</option>
                                        <option value="Phê duyệt">Phê duyệt</option>
                                        <option value="Từ chối">Từ chối</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default ListGuide
