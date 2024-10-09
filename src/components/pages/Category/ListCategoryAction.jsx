import { HiDotsHorizontal } from "react-icons/hi";
import { Link } from "react-router-dom";
import {BASE_URL} from '../../../utils/config'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useDropdown } from "../../Hooks/useDropdown";
const ListCategoryAction = ({ id, onDelete }) => {
    const { isDropdownOpen, toggleDropdown, dropdownRef } = useDropdown(); 
    const handleDeleteCategory = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this category?");
        if (!confirmDelete) return;

        try {
            const response  = await axios.delete(`${BASE_URL}/category/${id}`);
            if (response.status === 200) {
                onDelete(id);
                toast.success("Xóa danh mục thành công");
            } else {
                toast.error("Đã có lỗi xảy ra");
            }
        } catch (error) {
            toast.error("An error occurred while deleting the tour. Please try again.");
        }
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
                        <Link to={`/edit-category/${id}`} className="dropdown-menu-link">
                            Edit
                        </Link>
                    </li>
                    <li className="dropdown-menu-item">
                        <button 
                            onClick={handleDeleteCategory} 
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

export default ListCategoryAction;
