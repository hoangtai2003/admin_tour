import React, { useState, useEffect, useContext } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FaSave } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { SidebarContext } from '../../../context/SideBarContext';

const AddLocation = () => {
    const [formData, setFormData] = useState({
        news_name: '',
        news_description: '',
        news_image: '',
        news_date: '',
        news_status: "Xuất bản",
        news_content: ''
    });
    const { url } = useContext(SidebarContext)
    const navigate = useNavigate();
    const [category, setCategory] = useState([])
    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await axios.get(`${url}/category`)
                const category = response.data.data.map(cate => ({
                    value: cate.id,
                    label: cate.cate_name
                }))
                setCategory(category)
            } catch (error) {
                toast.error('Dữ liệu danh mục trống!');
            }
        };

        fetchCategory();
    }, []);

    const status = [
        { value: "Xuất bản", label: 'Xuất bản' },
        { value: "Không xuất bản", label: 'Không xuất bản' },
    ];

    const handleChange = async (e) => {
        const { name, value, files } = e.target;
    
        if (name === 'news_image' && files && files[0]) {
            const file = files[0];
            const imageUrl = URL.createObjectURL(file); 
    
            setFormData(prev => ({
                ...prev,
                news_image: file, 
                imagePreview: imageUrl 
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };
    
    

    const handleSelectChange = (selectedOption) => {
        setFormData(prev => ({ ...prev, cate_id: selectedOption ? selectedOption.value : '' }));
    };    

    const handleStatusChange = (selectedOption) => {
        setFormData(prev => ({ ...prev, news_status: selectedOption ? selectedOption.value : "Xuất bản" }));
    };

    const handleEditorChange = (event, editor, fieldName) => {
        const data = editor.getData();
        setFormData(prev => ({ ...prev, [fieldName]: data }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formSubmit = new FormData(); 
            formSubmit.append('news_name', formData.news_name);
            formSubmit.append('news_description', formData.news_description)
            formSubmit.append('news_image', formData.news_image);
            formSubmit.append('news_status', formData.news_status);
            formSubmit.append('news_date', formData.news_date);
            formSubmit.append("cate_id", formData.cate_id)
            formSubmit.append('news_content', formData.news_content)
            const res = await axios.post(`${url}/news`, formSubmit, {
                headers: {
                    'Content-Type': 'multipart/form-data' 
                }
            });
            navigate("/list-news");
            toast.success("Tạo tin tức thành công");
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <div className="tour-form-container">
                <div className='tour-form-left'>
                    <div className="form-group">
                        <label>Tiêu đề tin tức <span>*</span></label>
                        <input type="text" name="news_name" value={formData.news_name} required onChange={handleChange} />
                    </div>
                    <div className='form-row'>
                        <div className="form-group">
                            <label>Danh mục<span>*</span></label>
                            <Select
                                options={category}
                                onChange={handleSelectChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Trạng thái <span>*</span></label>
                            <Select
                                options={status}
                                onChange={handleStatusChange}
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Hình ảnh </label>
                            <input type="file" name="news_image" onChange={handleChange} />
                            {formData.imagePreview && (
                                <div className="image-preview">
                                    <img src={formData.imagePreview} alt="Location Preview" style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '10px' }} />
                                </div>
                            )}
                        </div>
                        <div className='form-group'>
                            <label>Ngày đăng</label>
                            <input type='date' name='news_date' onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Nội dung tin tức</label>
                        <textarea rows="10" style={{width: "100%"}} onChange={handleChange} name='news_content'/>
                    </div>
                    <div className="form-group">
                        <label>Mô tả tin tức <span>*</span></label>
                        <CKEditor
                            editor={ClassicEditor}
                            config={{
                                ckfinder: {
                                   uploadUrl: 'http://localhost:4000/api/v1/news/upload'
                                }
                            }}
                            onChange={(event, editor) => handleEditorChange(event, editor, 'news_description')}
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

export default AddLocation;
