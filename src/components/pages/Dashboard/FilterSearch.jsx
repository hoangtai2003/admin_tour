import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
const FilterSearch = ({ onFilter }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const handleFilter = () => {
      const selectedMonth = selectedDate.getMonth() + 1; 
      const selectedYear = selectedDate.getFullYear(); 
      onFilter(selectedMonth, selectedYear);
    };
    return (
        <div className="dashboard-filter">
             <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="MM-yyyy"
                showMonthYearPicker
                showFullMonthYearPicker
                style={{ marginRight: '10px' }}
            />

            <button onClick={handleFilter} className='dashboard-filter-button'><FaSearch />Lọc dữ liệu</button>
        </div>
    )
}

export default FilterSearch
