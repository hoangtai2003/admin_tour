import { useEffect, useRef, useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { Link } from "react-router-dom";
import {BASE_URL} from '../../../utils/config'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
const ListLocationAction = ({ id, onDelete }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const handleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const dropdownRef = useRef(null);

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
        document.addEventListener("mousedown", handleClickOutside);
        };
    }, []);
    const handleDeleteLocation = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this location?");
        if (!confirmDelete) return;

        try {
            const response  = await axios.delete(`${BASE_URL}/location/${id}`);
            if (response.status === 200) {
                onDelete(id);
                toast.success("Tour successfully deleted");
            } else {
                toast.error("Failed to delete the tour");
            }
        } catch (error) {
            toast.error("An error occurred while deleting the tour. Please try again.");
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
        </button>
    </>
  );
};

export default ListLocationAction;
