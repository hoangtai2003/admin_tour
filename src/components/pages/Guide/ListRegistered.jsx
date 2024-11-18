import React, { useContext  } from 'react';
import { SidebarContext } from '../../../context/SideBarContext';

const ListRegistered = () => {
    const { requestApproved } = useContext(SidebarContext);

    return (
        <section className="content-area-table">
            <div className="data-table-info">
                <h4 className="data-table-title">Danh sách tour đã đăng ký</h4>
            </div>
            <div className="data-table-diagram">
                <table>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên tour</th>
                            <th>Mã tour</th>
                            <th>Ngày bắt đầu tour</th>
                            <th>Trạng thái đăng ký</th>
                            <th>Thông tin bổ sung</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requestApproved.userTourRequests.map((tour, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{tour.tourRequestsChild.tour.name}</td>
                                <td>{tour.tourRequestsChild.tour_code}</td>
                                <td>{new Date(tour.tourRequestsChild.start_date).toLocaleDateString("vi-VN")}</td>
                                <td>{tour.status}</td>
                                <td>{tour.additional_info}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default ListRegistered;
