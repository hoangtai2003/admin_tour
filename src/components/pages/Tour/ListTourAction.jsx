import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { HiDotsHorizontal } from 'react-icons/hi';
import axios from 'axios';
import { toast } from 'react-toastify';
import { SidebarContext } from '../../../context/SideBarContext';
import { useDropdown } from '../../Hooks/useDropdown';

const ListTourAction = ({ id, onDelete }) => {
    const { url } = useContext(SidebarContext)
    const { isDropdownOpen, toggleDropdown, dropdownRef } = useDropdown(); 
    const handleDeleteTour = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this tour?");
        if (!confirmDelete) return;

        try {
            const response = await axios.delete(`${url}/tours/${id}`);

            if (response.status === 200) {
                onDelete(id);
                toast.success("Tour successfully deleted");
            } else {
                toast.error("Failed to delete the tour");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
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
                                <Link to={`/edit-tour/${id}`} className="dropdown-menu-link">
                                    Edit
                                </Link>
                            </li>
                            <li className="dropdown-menu-item">
                                <button 
                                    onClick={handleDeleteTour} 
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

export default ListTourAction;
