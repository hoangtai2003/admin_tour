import React, { useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { BASE_URL } from '../../../utils/config';
import { FaSave } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddCategory = () => {
    const [formData, setFormData] = useState({
        cate_name: '',
        cate_description: '',
        cate_status: "Hiển thị" 
    });
    const navigate = useNavigate();
    const status = [
        { value: "Hiển thị", label: 'Hiển thị' },
        { value: "Không hiển thị", label: 'Không hiển thị' },
    ];

    const handleChange = async (e) => {
       const name = e.target.name
       const value = e.target.value
       setFormData(prev => ({...prev, [name]: value}))
    };

    const handleStatusChange = (selectedOption) => {
        setFormData(prev => ({ ...prev, cate_status: selectedOption ? selectedOption.value : '' }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${BASE_URL}/category`, formData);
            if (res.status !== 200) {
                return alert(res.data.message);
            }
            navigate("/list-category");
            toast.success("Tạo danh mục thành công");
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <div className="tour-form-container">
                <div className='tour-form-left'>
                    <div className='form-row'>
                        <div className="form-group">
                            <label>Tên danh mục <span>*</span></label>
                            <input type="text" name='cate_name' value={formData.cate_name} required onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Trạng thái <span>*</span></label>
                            <Select
                                options={status}
                                onChange={handleStatusChange}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Mô tả danh mục <span>*</span></label>
                        <textarea rows="10" style={{width: "100%"}} onChange={handleChange} name='cate_description'/>
                    </div>
                    <div className="form-actions">
                        <button type="submit"><FaSave className='icon' />Lưu dữ liệu</button>
                        <button type="button" ><GrPowerReset className='icon' /> Reset</button>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default AddCategory;
