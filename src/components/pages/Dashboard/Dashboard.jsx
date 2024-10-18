import React, { useContext, useEffect, useState } from "react";
import { SiWindows11 } from "react-icons/si";
import { FaUser, FaRegFileWord } from "react-icons/fa";
import { MdOutlineAttachMoney } from "react-icons/md";
import { SidebarContext } from "../../../context/SideBarContext"
import FilterSearch from "./FilterSearch";
import RevenueChart from "./RevenueChart";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import './dashboard.css'
import axios from "axios";
const Dashboard = () => {

    const { url } = useContext(SidebarContext)
    const [statistical, setStatistical] = useState([])
    const [statisticalChart, setStatisticalChart] = useState([])
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    useEffect(() => {
        const statisticalTour = async() => {
            const response = await axios.get(`${url}/dashboard/statistical-tour`)
            setStatistical(response.data.data)
        }
        statisticalTour()
    }, [url])

    useEffect(() => {
        const fetchStatisticalChart = async (month, year) => {
            const response = await axios.get(`${url}/dashboard/bookings`, {
                params: { month, year }
            });
            setStatisticalChart(response.data.data);
        };
        fetchStatisticalChart(selectedMonth, selectedYear);
    }, [url, selectedMonth, selectedYear]);

    const handleFilter = (month, year) => {
        setSelectedMonth(month);
        setSelectedYear(year);
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
                                <span>{statistical.totalTour}</span>
                            </div>
                        </div>
                        <div className="dashboard_header-item">
                            <SiWindows11 />
                            <div className="dashboard_header-item--content">
                                <p>Tour đã đặt</p>
                                <span>{statistical.totalTourConfirm}</span>
                            </div>
                        </div>
                        <div className="dashboard_header-item">
                            <FaUser />
                            <div className="dashboard_header-item--content">
                                <p>Tổng số thành viên</p>
                                <span>{statistical.totalUser}</span>
                            </div>
                        </div>
                        <div className="dashboard_header-item">
                            <FaRegFileWord />
                            <div className="dashboard_header-item--content">
                                <p>Tổng số bài viết</p>
                                <span>{statistical.totalNews}</span>
                            </div>
                        </div>
                        <div className="dashboard_header-item">
                        <MdOutlineAttachMoney />
                            <div className="dashboard_header-item--content">
                                <p>Doanh thu ngày</p>
                                <span>{Number(statistical.revenueDay?.total_price).toLocaleString('vi-VN')} vnđ</span>
                            </div>
                        </div>
                        <div className="dashboard_header-item">
                        <MdOutlineAttachMoney />
                            <div className="dashboard_header-item--content">
                                <p>Doanh thu tháng</p>
                                <span>{Number(statistical.revenueMonth?.total_price).toLocaleString('vi-VN')} vnđ</span>
                            </div>
                        </div>
                        <div className="dashboard_header-item">
                        <MdOutlineAttachMoney />
                            <div className="dashboard_header-item--content">
                                <p>Doanh thu năm</p>
                                <span>{Number(statistical.revenueYear?.total_price).toLocaleString('vi-VN')} vnđ</span>
                            </div>
                        </div>
                    </div>
                    <div className="dashboard-wrapper-outstand">
                        <h2 className="dashboard-outstand-title">Tour nổi bật</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Mã chương trình</th>
                                    <th>Tên tour</th>
                                    <th>Lượt đăng ký</th>
                                </tr>
                            </thead>
                            <tbody>
                                {statistical.totalTourRegister?.map((statis, index) => (
                                    <tr key={index+1}>
                                        <td>{statis.program_code}</td>
                                        <td>{statis.name}</td>
                                        <td>{statis.count}</td>
                                    </tr>
                                ))}
                                
                            </tbody>
                        </table>
                    </div>
                    <FilterSearch onFilter={handleFilter} />
                    <div className="dashboard-wrapper-chart ">
                        <LineChart statisticalChart={statisticalChart} />
                        <PieChart statisticalChart={statisticalChart}/>
                    </div>
                    <RevenueChart statisticalChart={statisticalChart}/>
                </div>
            </section>
        </>
        
    );
};

export default Dashboard;
