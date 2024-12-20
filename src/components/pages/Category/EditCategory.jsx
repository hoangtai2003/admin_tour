import React, { useContext, useEffect, useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { FaSave } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { SidebarContext } from '../../../context/SideBarContext';

const EditCategory = () => {
    const { id } = useParams()
    const { url } = useContext(SidebarContext)
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
    useEffect(() => {
        const fetchCategory = async() => {
            try {
                const response = await axios.get(`${url}/category/${id}`)
                const categoryData = response.data.data
                setFormData({
                    cate_name: categoryData.cate_name,
                    cate_status: categoryData.cate_status,
                    cate_description: categoryData.cate_description
                })
            } catch (error) {
                toast.error('Đã có lỗi xảy ra !');
            }
        }
        fetchCategory()
    }, [id, url])
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
            const res = await axios.put(`${url}/category/${id}`, formData);
            if (res.status !== 200) {
                return alert(res.data.message);
            }
            toast.success("Sửa danh mục thành công");
            setTimeout(() => navigate('/list-category'), 500);
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
                                value={status.find(option => option.value === formData.cate_status) || null}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Mô tả danh mục <span>*</span></label>
                        <textarea 
                            rows="10" 
                            style={{width: "100%"}} 
                            name="cate_description" 
                            value={formData.cate_description} 
                            onChange={handleChange} 
                            />

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

export default EditCategory;
