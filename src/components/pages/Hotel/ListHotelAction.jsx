import { HiDotsHorizontal } from "react-icons/hi";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useDropdown } from "../../Hooks/useDropdown"; 
import { useContext } from "react";
import { SidebarContext } from "../../../context/SideBarContext";

const ListHotelAction = ({ slug, onDelete }) => {
    const { isDropdownOpen, toggleDropdown, dropdownRef } = useDropdown(); 
    const { url } = useContext(SidebarContext)
    const handleDeleteLocation = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this hotel?");
        if (!confirmDelete) return;

        try {
            const response  = await axios.delete(`${url}/hotel/${slug}`);
            if (response.status === 200) {
                onDelete(slug);
                toast.success("hotel successfully deleted");
            } else {
                toast.error("Failed to delete the hotel");
            }
        } catch (error) {
            toast.error("An error occurred while deleting the hotel. Please try again.");
        }
    };

    return (
        <div className="action-dropdown-btn" onClick={toggleDropdown} style={{ cursor: 'pointer' }}>
            <HiDotsHorizontal size={18} />
            {isDropdownOpen && (
                <div className="action-dropdown-menu" ref={dropdownRef}>
                    <ul className="dropdown-menu-list">
                        <li className="dropdown-menu-item">
                            <Link to={`/edit-hotel/${slug}`} className="dropdown-menu-link">
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
    );
};

export default ListHotelAction;
