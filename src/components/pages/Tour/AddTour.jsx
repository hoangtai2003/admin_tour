import React, { useState, useEffect } from 'react';
import './add-tour.css';
import Select from 'react-select';
import axios from 'axios';
import { BASE_URL } from '../../../utils/config'
import { CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FaSave } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import { useNavigate } from 'react-router-dom'
const  AddTour = () =>  {
    const [formData, setFormData] = useState({
        name: '',
        description_itinerary: '',
        price: '',
        duration: '',
        departure_city: '',
        transportations: '',
        tour_image: '',
        start_date: '',
        end_date: '',
        price_adult: '',
        price_child: '',
        total_seats: '',
        introduct_tour: '',
        location_ids: [] 
    });
    const navigate = useNavigate()
    const [locations, setLocations] = useState([]);
    // Lấy dữ liệu của location
    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/location`);
                const transformedLocations = transformLocations(response.data.data);
                setLocations(transformedLocations);
            } catch (error) {
                console.error('Error fetching locations:', error);
            }
        };

        fetchLocations();
    }, []);

    // Xử lý lấy dữ liệu từ ô input
    const handleChange = (e) => {
        const { name, value, files } = e.target;
    
        if (name === 'tour_image' && files && files[0]) {
            // If the input is for the tour image
            const formData = new FormData();
            formData.append('upload', files[0]);
    
            // Upload the image to the backend
            fetch('http://localhost:4000/uploads', {
                method: 'POST',
                body: formData,
            })
                .then(response => response.json())
                .then(data => {
                    if (data.uploaded) {
                        setFormData(prev => ({ ...prev, tour_image: data.url }));
                    } else {
                        alert('Image upload failed');
                    }
                })
                .catch(error => {
                    console.error('Error uploading image:', error);
                    alert('Error uploading image');
                });
        } else if (name === 'start_date' || name === 'end_date') {
            // Handle date input by formatting it to yyyy-mm-dd
            const [year, month, day] = value.split('-'); 
            const formattedDate = `${year}-${month}-${day}`;
    
            setFormData(prev => ({
                ...prev,
                [name]: formattedDate,
            }));
        } else {
            // Handle other inputs
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };
    
    
    
    // Xử lý lấy dữ liệu từ Select
    const handleSelectChange = (selectedOptions) => {
        const selectedValues = selectedOptions ? selectedOptions.map(option => option.value) : [];
        setFormData(prev => ({ ...prev, location_ids: selectedValues }));
    };
    
    // Xử lý lấy dữ liệu từ CkEditor
    const handleEditorChange = (event, editor, fieldName) => {
        const data = editor.getData();
        setFormData(prev => ({ ...prev, [fieldName]: data }));
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
                { value: location.id, label: `${'-'.repeat(indent)} ${location.name}` },
                ...formatOptions(location.children, indent + 1)
            ]);
        };

        return formatOptions(result);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${BASE_URL}/tours`, {
                method: 'post',
                headers: {
                    'content-type': 'application/json'
                }, 
                credentials: 'include',
                body: JSON.stringify(formData)
            })
            const result = res.json()
            if (!res.ok){
                return alert(result.message)
            }
            navigate("/list-tour")
        } catch (error) {
            alert(error.message)
        }
    };
    
    
    
  return (
    <form onSubmit={handleSubmit}>
        <div className="tour-form-container">
            <div className='tour-form-left'>
                <div className="form-group">
                    <label>Tiêu đề tour <span>*</span></label>
                    <input type="text" name="name" value={formData.name} required onChange={handleChange} />
                </div>
                <div className='form-row'>
                    <div className="form-group">
                        <label>Địa điểm <span>*</span></label>
                        <Select
                            isMulti
                            options={locations}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            onChange={handleSelectChange}
                        />

                    </div>

                </div>
                <div className='form-row'>
                    <div className="form-group">
                        <label>Số lượng người tham gia <span>*</span></label>
                        <input type="number" name="total_seats" value={formData.total_seats}  required onChange={handleChange} />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label>Thời gian <span>*</span></label>
                        <input type="text" name="duration" required value={formData.duration}  onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        <label>Giá tiền <span>*</span></label>
                        <input type="number" name="price" value={formData.price}  required onChange={handleChange} />
                    </div>
                </div>
                <div className='form-row'>
                    <div className="form-group">
                        <label>Giá người lớn <span>*</span></label>
                        <input type="number" name="price_adult" value={formData.price_adult} required onChange={handleChange} />
                    </div>
                    
                    <div className="form-group">
                        <label>Giá trẻ em <span>*</span></label>
                        <input type="number" name="price_child" value={formData.price_child} required onChange={handleChange} />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label>Phương tiện di chuyển <span>*</span></label>
                        <input type="text" name="transportations" value={formData.transportations} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label>Địa điểm xuất phát <span>*</span></label>
                        <input type="text" name="departure_city" value={formData.departure_city} onChange={handleChange}  />
                    </div>
                </div>                


                <div className="form-group">
                    <label>Lịch trình <span>*</span></label>
                    <CKEditor
                        editor={ClassicEditor}
                        config={{
                            ckfinder: {
                                uploadUrl: 'http://localhost:4000/uploads'
                            }
                        }}
                        onChange={(event, editor) => handleEditorChange(event, editor, 'description_itinerary')}
                    />
                </div>
                <div className="form-group">
                    <label>Giới thiệu tour <span>*</span></label>
                    <CKEditor
                        editor={ClassicEditor}
                        config={{
                            ckfinder: {
                                uploadUrl: 'http://localhost:4000/uploads'
                            }
                        }}
                        onChange={(event, editor) => handleEditorChange(event, editor, 'introduct_tour')}
                    />

                </div>
            </div>
            <div className='tour-form-right'>
                <h4>Thời gian diễn ra</h4>
                <div className="form-group">
                    <label>Ngày bắt đầu <span>*</span></label>
                    <input type="date" name="start_date" value={formData.start_date}  required  onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label>Ngày kết thúc <span>*</span></label>
                    <input type="date" name="end_date" value={formData.end_date} required onChange={handleChange}/>
                </div>
                <h4>Hình ảnh</h4>
                <div className="form-group">
                    <input type="file" name="tour_image" required onChange={handleChange}/>
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

export default AddTour;

