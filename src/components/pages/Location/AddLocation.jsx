import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { BASE_URL } from '../../../utils/config';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FaSave } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddLocation = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        parent_id: 0,
        location_img: '',
        status: ''  // Giá trị sẽ là 0 hoặc 1
    });
    const navigate = useNavigate();
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/location/all/getAllLocation`);
                const transformedLocations = transformLocations(response.data.data);
                setLocations(transformedLocations);
            } catch (error) {
                toast.error('Error fetching locations');
            }
        };

        fetchLocations();
    }, []);

    const status = [
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
                    toast.error('Image upload failed');
                }
            } catch (error) {
                toast.error('Error uploading image');
            }
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };
    

    const handleSelectChange = (selectedOption) => {
        setFormData(prev => ({ ...prev, parent_id: selectedOption ? selectedOption.value : 0 }));
    };

    const handleStatusChange = (selectedOption) => {
        setFormData(prev => ({ ...prev, status: selectedOption ? selectedOption.value : '' }));
    };

    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setFormData(prev => ({ ...prev, description: data }));
    };

    const transformLocations = (locations) => {
        const map = new Map();
        locations.forEach(location => map.set(location.id, { ...location, children: [] }));
        const result = [];

        map.forEach(location => {
            if (location.parent_id === 0) {
                result.push(location);
            } else {
                const parent = map.get(location.parent_id);
                if (parent) {
                    parent.children.push(location);
                }
            }
        });

        const formatOptions = (locations, indent = 0) => {
            return locations.flatMap(location => [
                { value: location.id, label: `${' '.repeat(indent * 2)}${location.name}` },
                ...formatOptions(location.children, indent + 1)
            ]);
        };

        return formatOptions(result);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${BASE_URL}/location`, formData);
            if (res.status !== 200) {
                return alert(res.data.message);
            }
            navigate("/list-location");
            toast.success("Create location successfully")
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <div className="tour-form-container">
                <div className='tour-form-left'>
                    <div className="form-group">
                        <label>Tên địa điểm <span>*</span></label>
                        <input type="text" name="name" value={formData.name} required onChange={handleChange} />
                    </div>
                    <div className='form-row'>
                        <div className="form-group">
                            <label>Địa điểm<span>*</span></label>
                            <Select
                                options={locations}
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
                            onChange={handleEditorChange}
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
