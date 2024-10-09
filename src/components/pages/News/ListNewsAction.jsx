import { HiDotsHorizontal } from "react-icons/hi";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useDropdown } from "../../Hooks/useDropdown";
import { useContext } from "react";
import { SidebarContext } from "../../../context/SideBarContext";
import Swal from "sweetalert2";
const ListNewsAction = ({ id, onDelete }) => {
    const { isDropdownOpen, toggleDropdown, dropdownRef } = useDropdown(); 
    const { url } = useContext(SidebarContext)
    const handleDeleteLocation = async () => {
        Swal.fire({
            title: "Bạn có muốn xóa không ",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.delete(`${url}/news/${id}`);
                    if (response.status === 200) {
                        onDelete(id); 
                        Swal.fire({
                            title: "Đã xóa",
                            text: "Tin tức đã xóa",
                            icon: "success"
                        });
                        toast.success("Xóa thành công");
                    } else {
                        toast.error("Failed to delete the tour");
                    }
                } catch (error) {
                    toast.error("An error occurred while deleting the tour. Please try again.");
                }
            } else {
                toast.info("Hủy bỏ!");
            }
        });
    };
    
    return (
        <>
            <div
                className="action-dropdown-btn"
                onClick={toggleDropdown}
                style={{ cursor: 'pointer' }}
            >
            <HiDotsHorizontal size={18} />
            {isDropdownOpen && (
                <div className="action-dropdown-menu" ref={dropdownRef}>
                    <ul className="dropdown-menu-list">
                        <li className="dropdown-menu-item">
                            <Link to={`/edit-news/${id}`} className="dropdown-menu-link">
                                Edit
                            </Link>
                        </li>
                        <li className="dropdown-menu-item">
                            <button 
                                onClick={handleDeleteLocation} 
                                className="dropdown-menu-link"
                                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                            >
                                Delete
                            </button>
                        </li>
                    </ul>
                </div>
            )}
            </div>
        </>
    );
};

export default ListNewsAction;
