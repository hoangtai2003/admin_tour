import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { HiDotsHorizontal } from 'react-icons/hi';
import {BASE_URL} from '../../../utils/config'
const ListTourAction = ({ id, onDelete }) => {
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

    const handleDeleteTour = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this tour?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`${BASE_URL}/tours/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                alert("Tour successfully deleted");
                onDelete(id);
            } else {
                alert("Failed to delete the tour");
            }
        } catch (error) {
            console.error("Error deleting tour:", error);
            alert("An error occurred while deleting the tour. Please try again.");
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
                                <Link to="/add-tour" className="dropdown-menu-link">
                                    Add
                                </Link>
                            </li>
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
            </button>
        </>
    );
};

export default ListTourAction;
