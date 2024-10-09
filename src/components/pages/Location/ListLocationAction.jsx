import { HiDotsHorizontal } from "react-icons/hi";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useDropdown } from "../../Hooks/useDropdown"; 
import { useContext } from "react";
import { SidebarContext } from "../../../context/SideBarContext";

const ListLocationAction = ({ id, onDelete }) => {
    const { isDropdownOpen, toggleDropdown, dropdownRef } = useDropdown(); 
    const { url } = useContext(SidebarContext)
    const handleDeleteLocation = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this location?");
        if (!confirmDelete) return;

        try {
            const response  = await axios.delete(`${url}/location/${id}`);
            if (response.status === 200) {
                onDelete(id);
                toast.success("Location successfully deleted");
            } else {
                toast.error("Failed to delete the location");
            }
        } catch (error) {
            toast.error("An error occurred while deleting the location. Please try again.");
        }
    };

    return (
        <div className="action-dropdown-btn" onClick={toggleDropdown} style={{ cursor: 'pointer' }}>
            <HiDotsHorizontal size={18} />
            {isDropdownOpen && (
                <div className="action-dropdown-menu" ref={dropdownRef}>
                    <ul className="dropdown-menu-list">
                        <li className="dropdown-menu-item">
                            <Link to={`/edit-location/${id}`} className="dropdown-menu-link">
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

export default ListLocationAction;
