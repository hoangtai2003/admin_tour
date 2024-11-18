import React, { useContext } from "react";
import { SidebarContext } from "../../../context/SideBarContext";
import axios from "axios";
import { toast } from "react-toastify";
const ListTourGuide = () => {
    
    const { user, url } = useContext(SidebarContext)
    const handleRegisterTour = async(tour_child_id) => {
        try {
            const response = await axios.post(`${url}/users/request/registerTour`, {tour_child_id, guideId: user.id});
            if (response.data.success) {
                toast.success("Đăng ký thành công! Đang chờ xác nhận từ admin.");
            } else {
                toast.error(response.data.message || "Đã có lỗi xảy ra. Vui lòng thử lại!");
            }
        } catch (error) {
            toast.error("Đã có lỗi xảy ra. Vui lòng thử lại!");
        }
    }
    return (
        <section className="content-area-table">
            <div className="data-table-info">
                <h4 className="data-table-title">Danh sách tour trong khu vực của bạn</h4>
            </div>
            <div className="data-table-diagram">
                <table>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên tour</th>
                            <th>Mã tour</th>
                            <th>Trạng thái hướng dẫn viên</th>
                            <th>Ngày bắt đầu tour</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {user.userLocation.tours?.map((tour, index) => (
                            <React.Fragment key={tour.id}>
                                {tour.tourChildren.map((child, childIndex) => (
                                    <tr key={childIndex}>
                                        {childIndex === 0 && (
                                            <>
                                                <td rowSpan={tour.tourChildren.length} className="index">{index + 1}</td>
                                                <td rowSpan={tour.tourChildren.length}>
                                                    <p style={{fontWeight: "650"}}>{tour.name}</p>
                                                    <p style={{fontWeight: "650", color: "#e01600"}}>Hành trình: {tour.duration}</p>
                                                    <img src={tour?.tourImage[0]?.image_url} alt="" style={{width: "50%", borderRadius: '5px'}}/>
                                                </td>
                                            </>
                                        )}
                                        <td>{child.tour_code}</td>
                                        <td>{child.status_guide}</td>
                                        <td>{new Date(child.start_date).toLocaleDateString("vi-VN")}</td>
                                        <td>
                                            {child.status_guide === "Đã có hướng dẫn viên" ? 
                                                <button type="button" className="button_register">Xem chi tiết</button> 
                                            : (
                                                <button type="button" onClick={() => handleRegisterTour(child.id)} className="button_register">Đăng ký</button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default ListTourGuide;
