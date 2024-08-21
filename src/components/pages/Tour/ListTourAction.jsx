import { useEffect, useRef, useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { Link } from "react-router-dom";

const ListTourAction = ({ id }) => {  // Destructure the id prop here
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
    const handleDeleteTour = () => {
        
    }
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
                                <Link to={`/delete-tour/${id}`} className="dropdown-menu-link" onClick={handleDeleteTour}>
                                    Delete
                                </Link>
                            </li>
                        </ul>
                    </div>
                )}
            </button>
        </>
    );
};

export default ListTourAction;
