import React, { useState, useEffect } from 'react';
import './tour.css';
import Select from 'react-select';
import axios from 'axios';
import { BASE_URL } from '../../../utils/config'
import { CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FaSave } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { AiOutlineDelete } from "react-icons/ai";
const  EditTour = () =>  {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description_itinerary: '',
        price: '',
        duration: '',
        departure_city: '',
        transportations: '',
        tour_image: '',
        introduct_tour: '',
        location_ids: [],
        tour_children: [{ start_date: '', end_date: '', price_adult: '', price_child: '', total_seats: '' }]
    });
    const [locations, setLocations] = useState([]);
    const [selectedLocations, setSelectedLocations] = useState([]);

    useEffect(() => {
        const fetchTourData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/tours/${id}`);
                const tourData = response.data.data;

                const locationIds = tourData.tourLocations.map(loc => loc.location_id);

                setFormData({
                    name: tourData.name,
                    description_itinerary: tourData.description_itinerary,
                    price: tourData.price,
                    duration: tourData.duration,
                    departure_city: tourData.departure_city,
                    transportations: tourData.transportations,
                    tour_image: tourData.tour_image,
                    introduct_tour: tourData.introduct_tour,
                    location_ids: locationIds || [],
                    tour_children: tourData.tourChildren || [{ start_date: '', end_date: '', price_adult: '', price_child: '', total_seats: '' }]
                });

                const selectedOptions = tourData.tourLocations.map(loc => ({
                    value: loc.location_id,
                    label: loc.location.name
                }));
                setSelectedLocations(selectedOptions);
            } catch (error) {
                toast.error('Error fetching tour data');
            }
        };

        if (locations.length > 0) {
            fetchTourData();
        }
    }, [id, locations]);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/location/all/getAllLocation`);
                const transformedLocations = transformLocations(response.data.data);
                setLocations(transformedLocations);
            } catch (error) {
                console.error('Error fetching locations:', error);
            }
        };

        fetchLocations();
    }, []);

    const handleChange = (e, index = null) => {
        const { name, value, files } = e.target;
    
        if (name === 'tour_image' && files && files[0]) {
            const formData = new FormData();
            formData.append('upload', files[0]);
    
            axios.post('http://localhost:4000/uploads', formData)
                .then(response => {
                    if (response.data.uploaded) {
                        setFormData(prev => ({ ...prev, tour_image: response.data.url }));
                    } else {
                        toast.error('Image upload failed');
                    }
                })
                .catch(error => {
                    toast.error('Error uploading image');
                });
        } else if (index !== null) {
            const updatedChildren = [...formData.tour_children];
            updatedChildren[index] = { ...updatedChildren[index], [name]: value };
            setFormData(prev => ({ ...prev, tour_children: updatedChildren }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };
    

    const handleSelectChange = selectedOptions => {
        setSelectedLocations(selectedOptions);
        const ids = selectedOptions.map(option => option.value);
        setFormData(prevState => ({
            ...prevState,
            location_ids: ids
        }));
    };

    const handleEditorChange = (event, editor, fieldName) => {
        const data = editor.getData();
        setFormData(prev => ({ ...prev, [fieldName]: data }));
    };

    const transformLocations = locations => {
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

    const handleAddTourChild = () => {
        setFormData(prev => ({
            ...prev,
            tour_children: [...prev.tour_children, { start_date: '', end_date: '', price_adult: '', price_child: '', total_seats: '' }]
        }));
    };

    const handleRemoveTourChild = index => {
        setFormData(prev => ({
            ...prev,
            tour_children: prev.tour_children.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.put(`${BASE_URL}/tours/${id}`, formData);
            if (res.status !== 200) {
                return alert(res.data.message);
            }
            navigate("/list-tour");
            toast.success("Edit tour successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
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
                            value={selectedLocations}
                        />

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
                            data={formData.description_itinerary}
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
                        data={formData.introduct_tour}
                        onChange={(event, editor) => handleEditorChange(event, editor, 'introduct_tour')}
                    />

                </div>
            </div>
            <div className='tour-form-right'>
                <h4>Hình ảnh</h4>
                <div className="form-group">
                    <input type="file" name="tour_image" onChange={handleChange} />
                    {formData.tour_image && (
                        <div className="image-preview">
                            <img src={formData.tour_image} alt="Tour Preview" style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '10px' }} />
                        </div>
                    )}
                </div>
                <div className="form-actions">
                    <button type="submit"><FaSave className='icon' />Lưu dữ liệu</button>
                    <button type="button" ><GrPowerReset className='icon' /> Reset</button>
                </div>
            </div>
        </div>
        <div className="tour-child-container">
            {formData.tour_children.map((child, index) => (
                <div key={index} className="tour-child-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label>Ngày bắt đầu <span>*</span></label>
                            <input type="date" name="start_date" value={child.start_date} required onChange={(e) => handleChange(e, index)} />
                        </div>
                        <div className="form-group">
                            <label>Ngày kết thúc <span>*</span></label>
                            <input type="date" name="end_date" value={child.end_date} required onChange={(e) => handleChange(e, index)} />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Giá tiền người lớn <span>*</span></label>
                            <input type="number" name="price_adult" value={child.price_adult} required onChange={(e) => handleChange(e, index)} />
                        </div>
                        <div className="form-group">
                            <label>Giá tiền trẻ em <span>*</span></label>
                            <input type="number" name="price_child" value={child.price_child} required onChange={(e) => handleChange(e, index)} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Số lượng người tham gia <span>*</span></label>
                            <input type="number" name="total_seats" value={child.total_seats} required onChange={(e) => handleChange(e, index)} />
                        </div>
                        <div className='form-group'>
                            <input type='text' hidden/>
                        </div>
                    </div>

                    <button type="button" onClick={() => handleRemoveTourChild(index)}><div className='icon_delete'><AiOutlineDelete /></div></button>
                </div>
            ))}
        </div>


        <div className='add_child'>
            <button type="button" onClick={handleAddTourChild}>Add Child Tour</button>
        </div>
    </form>
  );
}

export default EditTour;

