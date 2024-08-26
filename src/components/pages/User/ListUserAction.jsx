import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { HiDotsHorizontal } from 'react-icons/hi';
import {BASE_URL} from '../../../utils/config'
import axios from 'axios';
import { toast } from 'react-toastify';
const ListUserAction = ({ id, onDelete }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    const handleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShowDropdown(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleDeleteUser = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (!confirmDelete) return;

        try {
            const response  = await axios.delete(`${BASE_URL}/users/${id}`);

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
            <button
                type="button"
                className="action-dropdown-btn"
                onClick={handleDropdown}
            >
                <HiDotsHorizontal size={18} />
                {showDropdown && (
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
            </button>
        </>
    );
};

export default ListUserAction;
