import { Link } from 'react-router-dom';
import { HiDotsHorizontal } from 'react-icons/hi';
import { SidebarContext } from "../../../context/SideBarContext";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { useDropdown } from '../../Hooks/useDropdown';
const ListUserAction = ({ id, onDelete }) => {
    const { isDropdownOpen, toggleDropdown, dropdownRef } = useDropdown(); 
    const { url } = useContext(SidebarContext)
    const handleDeleteUser = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (!confirmDelete) return;

        try {
            const response  = await axios.delete(`${url}/users/${id}`);

            if (response.status === 200) {
                onDelete(id);
                toast.success("User successfully deleted");
            } else {
                toast.error("Failed to delete the user");
            }
        } catch (error) {
            toast.error("An error occurred while deleting the user. Please try again.");
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
                                <Link to={`/edit-user/${id}`} className="dropdown-menu-link">
                                    Edit
                                </Link>
                            </li>
                            <li className="dropdown-menu-item">
                                <button 
                                    className="dropdown-menu-link"
                                    onClick={handleDeleteUser}
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

export default ListUserAction;
