import React, { useContext, useRef, useState, useEffect } from "react";
import {
  MdOutlineBarChart,
  MdOutlineLogout,
} from "react-icons/md";
import { FaUser, FaHome, FaRegFileWord, FaBed, FaShoppingCart, FaHammer } from "react-icons/fa";
import { MdDirectionsWalk } from "react-icons/md";
import { TfiMenuAlt } from "react-icons/tfi";
import { TiMessages } from "react-icons/ti";
import { SlLocationPin } from "react-icons/sl";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./sidebar.css";
import { SidebarContext } from "../../context/SideBarContext";
import { Button } from "reactstrap";
import { VscAccount } from "react-icons/vsc";

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isSidebarOpen, setToken, userPermissions, user } = useContext(SidebarContext);
    const navbarRef = useRef(null);
    
    const [activeLink, setActiveLink] = useState(location.pathname);

    useEffect(() => {
        setActiveLink(location.pathname);
    }, [location.pathname]);

    const handleLogout = () => {
        localStorage.removeItem("token_admin");
        setToken(""); 
        navigate("/login");
    };

    return (
        <nav
          className={`sidebar ${isSidebarOpen ? "sidebar-show" : ""}`}
          ref={navbarRef}
        >
			<div className="sidebar-top">
				<div className="sidebar-brand">
					<span className="sidebar-brand-text">Du lịch Việt.</span>
					<span className="sidebar-brand-user">Xin chào, {user.username}</span>
					<div className="sidebar-account">
						{userPermissions.includes('quan-ly-tai-khoan') && (
							<div className={`menu-item ${activeLink === "/profile" ? "active" : ""}`} style={{marginLeft: "-10px"}}>
								<Link to="/profile" className="menu-link" onClick={() => setActiveLink("/profile")}>
									<span className="menu-link-icon">
										<VscAccount  size={18} />
									</span>
									<span className="menu-link-text">Quản lý tài khoản</span>
								</Link>
							</div>
						)}
						<Button type="submit" className="menu-link" onClick={handleLogout} style={{marginLeft: "-10px"}}>
							<span className="menu-link-icon" style={{fontSize: "1px"}}>
								<MdOutlineLogout size={20} />
							</span>
							<span className="menu-link-text" style={{fontSize: '15px'}}>Đăng xuất</span>
						</Button>	
					</div>
								
				</div>
			</div>
			<div className="sidebar-body">
				<div className="sidebar-menu">
					<ul className="menu-list" style={{marginTop: "-20px"}}>
						{userPermissions.includes('thong-ke') && (
							<li className={`menu-item ${activeLink === "/thong-ke" ? "active" : ""}`}>
								<Link to="/thong-ke" className="menu-link" onClick={() => setActiveLink("/thong-ke")}>
									<span className="menu-link-icon">
										<FaHome size={18}/>
									</span>
									<span className="menu-link-text">Bảng điều khiển</span>
								</Link>
							</li>
						)}
						{userPermissions.includes('danh-sach-danh-muc') && (
							<li className={`menu-item ${activeLink === "/list-category" ? "active" : ""}`}>
								<Link to="/list-category" className="menu-link" onClick={() => setActiveLink("/list-category")}>
									<span className="menu-link-icon">
										<TfiMenuAlt size={20} />
									</span>
									<span className="menu-link-text">Quản lý danh mục</span>
								</Link>
							</li>
						)}
						{userPermissions.includes('danh-sach-bai-viet') && (
							<li className={`menu-item ${activeLink === "/list-news" ? "active" : ""}`}>
								<Link to="/list-news" className="menu-link" onClick={() => setActiveLink("/list-news")}>
									<span className="menu-link-icon">
										<FaRegFileWord size={20}/>
									</span>
									<span className="menu-link-text">Quản lý bài viết</span>
								</Link>
							</li>
						)}
						{userPermissions.includes('danh-sach-dia-diem') && (
							<li className={`menu-item ${activeLink === "/list-location" ? "active" : ""}`}>
								<Link to="/list-location" className="menu-link" onClick={() => setActiveLink("/list-location")}>
									<span className="menu-link-icon">
										<SlLocationPin size={20} />
									</span>
									<span className="menu-link-text">Quản lý địa điểm</span>
								</Link>
							</li>
						)}
						{userPermissions.includes('danh-sach-tour') && (
							<li className={`menu-item ${activeLink === "/list-tour" ? "active" : ""}`}>
								<Link to="/list-tour" className="menu-link" onClick={() => setActiveLink("/list-tour")}>
									<span className="menu-link-icon">
										<MdOutlineBarChart size={20} />
									</span>
									<span className="menu-link-text">Quản lý tour</span>
								</Link>
							</li>
						)}
						{userPermissions.includes('danh-sach-khach-san') && (
						<li className={`menu-item ${activeLink === "/list-hotel" ? "active" : ""}`}>
							<Link to="/list-hotel" className="menu-link" onClick={() => setActiveLink("/list-hotel")}>
								<span className="menu-link-icon">
									<FaBed size={20} />
								</span>
								<span className="menu-link-text">Quản lý khách sạn</span>
							</Link>
						</li>
						)}
						{userPermissions.includes('danh-sach-dat-tour') && (
							<li className={`menu-item ${activeLink === "/list-booking" ? "active" : ""}`}>
								<Link to="/list-booking" className="menu-link" onClick={() => setActiveLink("/")}>
									<span className="menu-link-icon">
										<FaShoppingCart size={20} />
									</span>
									<span className="menu-link-text">Danh sách đặt tour</span>
								</Link>
							</li>
						)}
						{userPermissions.includes('danh-sach-binh-luan') && (
							<li className={`menu-item ${activeLink === "/list-review" ? "active" : ""}`}>
								<Link to="/list-review" className="menu-link" onClick={() => setActiveLink("/list-review")}>
									<span className="menu-link-icon">
										<TiMessages size={20} />
									</span>
									<span className="menu-link-text">Quản lý bình luận</span>
								</Link>
							</li>
						)}
						{userPermissions.includes('danh-sach-user') && (
							<li className={`menu-item ${activeLink === "/list-user" ? "active" : ""}`}>
								<Link to="/list-user" className="menu-link" onClick={() => setActiveLink("/list-user")}>
									<span className="menu-link-icon">
										<FaUser size={18} />
									</span>
									<span className="menu-link-text">Quản lý người dùng</span>
								</Link>
							</li>
						)}
						{userPermissions.includes('danh-sach-vai-tro') && (
							<li className={`menu-item ${activeLink === "/list-role" ? "active" : ""}`}>
								<Link to="/list-role" className="menu-link" onClick={() => setActiveLink("/list-role")}>
									<span className="menu-link-icon">
										<FaHammer size={18} />
									</span>
									<span className="menu-link-text">Quản lý vai trò</span>
								</Link>
							</li>
						)}
						{userPermissions.includes('danh-sach-huong-dan-vien') && (
							<li className={`menu-item ${activeLink === "/list-guide" ? "active" : ""}`}>
								<Link to="/list-guide" className="menu-link" onClick={() => setActiveLink("/list-guide")}>
									<span className="menu-link-icon">
										<MdDirectionsWalk size={18} />
									</span>
									<span className="menu-link-text">Danh sách hướng dẫn viên </span>
								</Link>
							</li>
						)}
						{userPermissions.includes('dang-ky-tour') && (
							<li className={`menu-item ${activeLink === "/list-tour-sign" ? "active" : ""}`}>
								<Link to="/list-tour-sign" className="menu-link" onClick={() => setActiveLink("/list-tour-sign")}>
									<span className="menu-link-icon">
										<MdDirectionsWalk size={18} />
									</span>
									<span className="menu-link-text">Đăng ký tour</span>
								</Link>
							</li>
						)}
						{userPermissions.includes('danh-sach-tour-da-dang-ky') && (
							<li className={`menu-item ${activeLink === "/list-registered" ? "active" : ""}`}>
								<Link to="/list-registered" className="menu-link" onClick={() => setActiveLink("/list-registered")}>
									<span className="menu-link-icon">
										<MdDirectionsWalk size={18} />
									</span>
									<span className="menu-link-text">Danh sách Tour đã đăng ký</span>
								</Link>
							</li>
						)}
					</ul>
				</div>
			</div>
        </nav>
    );
};

export default Sidebar;
