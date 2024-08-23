import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { BASE_URL } from '../../../utils/config';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FaSave } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import { useNavigate, useParams } from 'react-router-dom';

const EditLocation = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        parent_id: 0,
        location_img: '',
        status: '' 
    });
    const navigate = useNavigate();
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        const fetchLocationData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/location/${id}`);
                const locationData = response.data.data;

                
                setFormData({
                    name: locationData.name,
                    location_img: locationData.location_img,
                    description: locationData.description,
                    parent_id: locationData.parent_id,
                    status: locationData.status.data[1]
                });
            } catch (error) {
                console.error('Error fetching location data:', error);
            }
        };
        fetchLocationData();
    }, [id]);

    const statusOptions = [
        { value: 0, label: 'Hiển thị' },
        { value: 1, label: 'Không hiển thị' },
    ];

    const handleChange = async (e) => {
        const { name, value, files } = e.target;
    
        if (name === 'location_img' && files && files[0]) {
            const formData = new FormData();
            formData.append('upload', files[0]);
    
            try {
                const response = await axios.post('http://localhost:4000/uploads', formData);
                if (response.data.uploaded) {
                    setFormData(prev => ({ ...prev, location_img: response.data.url }));
                } else {
                    alert('Image upload failed');
                }
            } catch (error) {
                console.error('Error uploading image:', error);
                alert('Error uploading image');
            }
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleStatusChange = (selectedOption) => {
        setFormData(prev => ({ ...prev, status: selectedOption ? selectedOption.value : '' }));
    };

    const handleEditorChange = (event, editor, fieldName) => {
        const data = editor.getData();
        setFormData(prev => ({ ...prev, [fieldName]: data }));
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`${BASE_URL}/location/${id}`, formData)
            if (res.status !== 200) {
                return alert(res.data.message);
            }
            navigate("/list-location");
        } catch (error) {
            alert(error.response?.data?.message || error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="tour-form-container">
                <div className='tour-form-left'>
                    <div className='form-row'>
                        <div className="form-group">
                            <label>Tên địa điểm<span>*</span></label>
                            <input type="text" name="name" value={formData.name} required onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Trạng thái <span>*</span></label>
                            <Select 
                                options={statusOptions}
                                onChange={handleStatusChange}
                                value={statusOptions.find(option => option.value === formData.status) || null}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Hình ảnh </label>
                        <input type="file" name="location_img" onChange={handleChange} />
                        {formData.location_img && (
                            <div className="image-preview">
                                <img src={formData.location_img} alt="Location Preview" style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '10px' }} />
                            </div>
                        )}
                    </div>
                    <div className="form-group">
                        <label>Mô tả địa điểm <span>*</span></label>
                        <CKEditor
                            editor={ClassicEditor}
                            config={{
                                ckfinder: {
                                    uploadUrl: 'http://localhost:4000/uploads'
                                }
                            }}
                            data={formData.description}
                            onChange={(event, editor) => handleEditorChange(event, editor, 'description')}
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

export default EditLocation;
