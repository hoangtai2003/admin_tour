import React, { useEffect, useState } from "react";
import axios from "axios";
import { SiWindows11 } from "react-icons/si";
import { FaUser, FaRegFileWord } from "react-icons/fa";
import './dashboard.css'
import { MdOutlineAttachMoney } from "react-icons/md";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { FaSearch } from "react-icons/fa";
const Dashboard = () => {
    const [month, setMonth] = useState('10');
    const [year, setYear] = useState('2023');
    const handleFilter = () => {
        console.log(`Tìm kiếm dữ liệu cho tháng ${month}, năm ${year}`);
        
      };
    const lineChartOptions = {
        chart: {
          type: 'line',
        },
        title: {
          text: 'Thống kê lượng khách hàng đặt tour trong tháng',
        },
        xAxis: {
          categories: [
            '2023-10-01', '2023-10-02', '2023-10-03', '2023-10-04',
            '2023-10-05', '2023-10-06', '2023-10-07', '2023-10-08',
            '2023-10-09', '2023-10-10'
          ],
        },
        yAxis: {
          title: {
            text: 'Số lượng khách hàng',
          },
        },
        tooltip: {
          shared: true,
          valueSuffix: '',
        },
        series: [
          {
            name: 'Tổng số người lớn',
            data: [5, 3, 4, 7, 2, 0, 10, 0, 6, 2],
            color: '#7cb5ec',
          },
          {
            name: 'Tổng số trẻ em',
            data: [2, 1, 3, 2, 1, 0, 5, 0, 4, 1],
            color: '#434348',
          },
        ],
    };
    
    
    const pieChartOptions = {
    chart: {
        type: 'pie',
    },
    title: {
        text: 'Trạng thái các tour du lịch',
    },
    series: [
        {
        name: 'Số lượng',
        colorByPoint: true,
        data: [
            { name: 'Tiếp nhận', y: 45, color: '#7cb5ec' },
            { name: 'Đã xác nhận', y: 20, color: '#434348' },
            { name: 'Đã thanh toán', y: 25, color: '#90ed7d' },
            { name: 'Đã kết thúc', y: 10, color: '#f7a35c' },
            { name: 'Hủy bỏ', y: 5, color: '#f15c80' },
        ],
        },
    ],
    };

    const revenueChartOptions = {
        chart: {
          type: 'line',
        },
        title: {
          text: 'Thống kê Doanh thu trong tháng',
        },
        xAxis: {
          categories: [
            '2023-10-01', '2023-10-02', '2023-10-03', '2023-10-04',
            '2023-10-05', '2023-10-06', '2023-10-07', '2023-10-08',
            '2023-10-09', '2023-10-10', '2023-10-11', '2023-10-12',
            '2023-10-13', '2023-10-14', '2023-10-15', '2023-10-16',
            '2023-10-17', '2023-10-18', '2023-10-19', '2023-10-20',
            '2023-10-21', '2023-10-22', '2023-10-23', '2023-10-24',
            '2023-10-25', '2023-10-26', '2023-10-27', '2023-10-28',
            '2023-10-29', '2023-10-30', '2023-10-31',
          ],
        },
        yAxis: {
          title: {
            text: 'Tiền',
          },
        },
        tooltip: {
          shared: true,
          valueSuffix: ' VND',
        },
        series: [
          {
            name: 'Doanh thu',
            data: [
              500000, 800000, 1200000, 1500000, 1000000, 900000, 0, 0, 500000, 300000,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            ],
            color: '#7cb5ec',
          },
        ],
    };
    return (
        <>
            <h2 className="dashboard-title">Quản lý du lịch</h2>
            <section className="dashboard-container">
                <div className="dashboard-wrapper">
                    <div className="dashboard-wrapper-header">
                        <div className="dashboard_header-item">
                            <SiWindows11 />
                            <div className="dashboard_header-item--content">
                                <p>Tổng số tour</p>
                                <span>10</span>
                            </div>
                        </div>
                        <div className="dashboard_header-item">
                            <SiWindows11 />
                            <div className="dashboard_header-item--content">
                                <p>Tour đã đặt</p>
                                <span>4</span>
                            </div>
                        </div>
                        <div className="dashboard_header-item">
                            <FaUser />
                            <div className="dashboard_header-item--content">
                                <p>Tổng số thành viên</p>
                                <span>4</span>
                            </div>
                        </div>
                        <div className="dashboard_header-item">
                            <FaRegFileWord />
                            <div className="dashboard_header-item--content">
                                <p>Tổng số bài viết</p>
                                <span>4</span>
                            </div>
                        </div>
                        <div className="dashboard_header-item">
                        <MdOutlineAttachMoney />
                            <div className="dashboard_header-item--content">
                                <p>Doanh thu ngày</p>
                                <span>4</span>
                            </div>
                        </div>
                        <div className="dashboard_header-item">
                        <MdOutlineAttachMoney />
                            <div className="dashboard_header-item--content">
                                <p>Doanh thu tháng</p>
                                <span>4</span>
                            </div>
                        </div>
                        <div className="dashboard_header-item">
                        <MdOutlineAttachMoney />
                            <div className="dashboard_header-item--content">
                                <p>Doanh thu năm</p>
                                <span>4</span>
                            </div>
                        </div>
                    </div>
                    <div className="dashboard-wrapper-outstand">
                        <h2 className="dashboard-outstand-title">Tour nổi bật</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Mã tour</th>
                                    <th>Tên tour</th>
                                    <th>Lượt đăng ký</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>JBAGN871</td>
                                    <td>Cần Thơ - Hà Nội - Sapa - Yên Tử - Hạ Long (khách sạn 3 sao) - Tặng Vé Xe Lửa Mường Hoa</td>
                                    <td>17</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="dashboard-filter">
                        <select value={month} onChange={(e) => setMonth(e.target.value)} style={{ marginRight: '10px' }}>
                            <option value="01">01</option>
                            <option value="02">02</option>
                            <option value="03">03</option>
                            <option value="04">04</option>
                            <option value="05">05</option>
                            <option value="06">06</option>
                            <option value="07">07</option>
                            <option value="08">08</option>
                            <option value="09">09</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                        </select>

                        <select value={year} onChange={(e) => setYear(e.target.value)} style={{ marginRight: '10px' }}>
                            <option value="2022">2022</option>
                            <option value="2023">2023</option>
                            <option value="2024">2024</option>
                        </select>

                        <button onClick={handleFilter}><FaSearch />Lọc dữ liệu</button>
                    </div>
                    <div className="dashboard-wrapper-chart ">
                        <div style={{ width: '65%' }}>
                            <HighchartsReact highcharts={Highcharts} options={lineChartOptions} />
                        </div>
                        <div style={{marginLeft: "20px"}}>
                            <HighchartsReact highcharts={Highcharts} options={pieChartOptions} />
                        </div>
                    </div>
                    <div style={{ width: '100%', marginTop: "50px" }}>
                        <HighchartsReact highcharts={Highcharts} options={revenueChartOptions} />
                    </div>
                </div>
            </section>
        </>
        
    );
};

export default Dashboard;
