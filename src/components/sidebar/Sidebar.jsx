import React, { useContext, useEffect, useRef } from "react";
import {
  MdOutlineBarChart,
  MdOutlineClose,
  MdOutlineLogout,
} from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { TfiMenuAlt } from "react-icons/tfi";
import { TiMessages } from "react-icons/ti";
import { SlLocationPin } from "react-icons/sl";
import { FaRegFileWord } from "react-icons/fa";
import { FaBed } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaHammer } from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";
import "./sidebar.css";
import { SidebarContext } from "../../context/SideBarContext";
import { AuthContext } from "../../context/AuthContext";
import { Button } from "reactstrap";

const Sidebar = () => {
    const navigate = useNavigate()
    const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
    const {dispatch} = useContext(AuthContext)
    const navbarRef = useRef(null)
  const logout = () => {
    dispatch({type: "LOGOUT"})
    navigate('/login')
}
  return (
    <nav
      className={`sidebar ${isSidebarOpen ? "sidebar-show" : ""}`}
      ref={navbarRef}
    >
      <div className="sidebar-top">
        <div className="sidebar-brand">
          <span className="sidebar-brand-text">Travel tour.</span>
        </div>
        <button className="sidebar-close-btn" onClick={closeSidebar}>
          <MdOutlineClose size={24} />
        </button>
      </div>
      <div className="sidebar-body">
        <div className="sidebar-menu">
          <ul className="menu-list">
            <li className="menu-item">
              <Link to="/" className="menu-link">
                <span className="menu-link-icon">
                <FaHome size={18}/>
                </span>
                <span className="menu-link-text">Bảng điều khiển</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/" className="menu-link">
                <span className="menu-link-icon">
                  <TfiMenuAlt size={20} />
                </span>
                <span className="menu-link-text">Danh mục</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/" className="menu-link">
                <span className="menu-link-icon">
                  <FaRegFileWord size={20}/>
                </span>
                <span className="menu-link-text">Bài viết</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/list-location" className="menu-link">
                <span className="menu-link-icon">
                  <SlLocationPin size={20} />
                </span>
                <span className="menu-link-text">Địa điểm</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/list-tour" className="menu-link">
                <span className="menu-link-icon">
                  <MdOutlineBarChart size={20} />
                </span>
                <span className="menu-link-text">Tours</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/list-tour" className="menu-link">
                <span className="menu-link-icon">
                  <FaBed  size={20} />
                </span>
                <span className="menu-link-text">Khách sạn</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/list-tour" className="menu-link">
                <span className="menu-link-icon">
                  <FaShoppingCart  size={20} />
                </span>
                <span className="menu-link-text">Danh sách đặt tour</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/" className="menu-link">
                <span className="menu-link-icon">
                  <TiMessages size={20} />
                </span>
                <span className="menu-link-text">Quản lý bình luận</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/list-user" className="menu-link">
                <span className="menu-link-icon">
                  <FaUser size={18} />
                </span>
                <span className="menu-link-text">Người dùng</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/" className="menu-link">
                <span className="menu-link-icon">
                  <FaHammer size={18} />
                </span>
                <span className="menu-link-text">Vai trò</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="sidebar-menu sidebar-menu2">
          <ul className="menu-list">
            <li className="menu-item">
              <Button type="submit" className="menu-link" onClick={logout}>
                <span className="menu-link-icon">
                  <MdOutlineLogout size={20} />
                </span>
                <span className="menu-link-text" style={{fontSize: '17px'}}>Logout</span>
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
