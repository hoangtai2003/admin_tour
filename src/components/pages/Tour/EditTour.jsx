import React, { useState, useEffect, useContext } from 'react';
import './tour.css';
import Select from 'react-select';
import axios from 'axios';
import { CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FaSave } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { AiOutlineDelete } from "react-icons/ai";
import { SidebarContext } from '../../../context/SideBarContext';
const EditTour = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { url } = useContext(SidebarContext)
    const [formData, setFormData] = useState({
        name: '',
        description_itinerary: '',
        price: '',
        duration: '',
        departure_city: '',
        transportation: '',
        tour_image: [], 
        introduct_tour: '',
        location_ids: [],
        tour_children: [
            { 
                start_date: '', 
                end_date: '', 
                price_adult: '', 
                price_child: '', 
                price_toddler: '', 
                price_baby: '', 
                transportion_start: '', 
                transportion_end: '',
                time_goes_start: '',
                time_comes_start: '',
                time_goes_end: '',
                time_comes_end: '',
                total_seats: '', 
                price_sale: '' 
            }
        ]
    });
    const [locations, setLocations] = useState([]);
    const [selectedLocations, setSelectedLocations] = useState([]);

    useEffect(() => {
        const fetchTourData = async () => {
            try {
                const response = await axios.get(`${url}/tours/${id}`);
                const tourData = response.data.data;

                const locationIds = tourData.locations.map(loc => loc.TourLocation.location_id);

                const tourImage = tourData.tourImage.map(image => ({url: image.image_url }))
                setFormData({
                    name: tourData.name,
                    description_itinerary: tourData.description_itinerary,
                    price: tourData.price,
                    duration: tourData.duration,
                    departure_city: tourData.departure_city,
                    transportation: tourData.transportation,
                    introduct_tour: tourData.introduct_tour,
                    location_ids: locationIds || [],
                    tour_children: tourData.tourChildren || [{ 
                        start_date: '', 
                        end_date: '', 
                        price_adult: '', 
                        price_child: '', 
                        price_toddler: '', 
                        price_baby: '', 
                        transportion_start: '', 
                        transportion_end: '',
                        time_goes_start: '',
                        time_comes_start: '',
                        time_goes_end: '',
                        time_comes_end: '',
                        total_seats: '', 
                        price_sale: '' 
                    }],
                    tour_image: tourImage || [],
                });

                const selectedOptions = tourData.locations.map(loc => ({
                    value: loc.TourLocation.location_id,
                    label: loc.name
                }));
                setSelectedLocations(selectedOptions);
            } catch (error) {
                toast.error('Error fetching tour data');
            }
        };

        if (locations.length > 0) {
            fetchTourData();
        }
    }, [id, locations, url]);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await axios.get(`${url}/location/all/getAllLocation`);
                const transformedLocations = transformLocations(response.data.data);
                setLocations(transformedLocations);
            } catch (error) {
                console.error('Error fetching locations:', error);
            }
        };

        fetchLocations();
    }, [url]);

    const handleChange = (e, index = null) => {
        const { name, value, files } = e.target;

        if (name === 'tour_image' && files && files.length > 0) {
            
            const newImages = Array.from(files).map(file => ({
                url: URL.createObjectURL(file),
                file 
            }));

            setFormData(prev => ({
                ...prev,
                tour_image: [...prev.tour_image, ...newImages]
            }));
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
    const handleRemoveImage = (index) => {
            setFormData(prev => ({
                ...prev,
                tour_image: prev.tour_image.filter((_, i) => i !== index) 
            }));
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
            tour_children: [
                ...prev.tour_children, 
                { 
                    start_date: '', 
                    end_date: '', 
                    price_adult: '', 
                    price_child: '', 
                    price_toddler: '', 
                    price_baby: '', 
                    transportion_start: '', 
                    transportion_end: '',
                    time_goes_start: '',
                    time_comes_start: '',
                    time_goes_end: '',
                    time_comes_end: '',
                    total_seats: '', 
                    price_sale: '' 
                }
            
            ]
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
        const formDataObj = new FormData();
    
        formDataObj.append('name', formData.name);
        formDataObj.append('description_itinerary', formData.description_itinerary);
        formDataObj.append('price', formData.price);
        formDataObj.append('duration', formData.duration);
        formDataObj.append('departure_city', formData.departure_city);
        formDataObj.append('introduct_tour', formData.introduct_tour);
        formDataObj.append('transportation', formData.transportation)
        if (formData.tour_image && formData.tour_image.length > 0) {
            for (let i = 0; i < formData.tour_image.length; i++) {
                formDataObj.append('tour_image', formData.tour_image[i].file);
            }
        }
        formDataObj.append('location_ids', JSON.stringify(formData.location_ids));
        formDataObj.append('tour_children', JSON.stringify(formData.tour_children));
        try {
            const res = await axios.put(`${url}/tours/${id}`, formDataObj, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
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
                        <label>Địa điểm xuất phát <span>*</span></label>
                        <input type="text" name="departure_city" value={formData.departure_city} onChange={handleChange}  />
                    </div>
                    <div className="form-group">
                        <label>Phương tiện di chuyển <span>*</span></label>
                        <input type="text" name="transportation" value={formData.transportation} onChange={handleChange}  />
                    </div>
                </div>                


                <div className="form-group">
                    <label>Lịch trình <span>*</span></label>
                    <CKEditor
                            editor={ClassicEditor}
                            config={{
                                ckfinder: {
                                    uploadUrl: 'http://localhost:4000/api/v1/tours/upload'
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
                               uploadUrl: 'http://localhost:4000/api/v1/tours/upload'
                            }
                        }}
                        data={formData.introduct_tour}
                        onChange={(event, editor) => handleEditorChange(event, editor, 'introduct_tour')}
                    />

                </div>
            </div>
            <div className='tour-form-right'>
                <div className="form-group">
                        <label>Hình ảnh <span>*</span></label>
                        <input
                            type="file"
                            name="tour_image"
                            multiple
                            accept="image/*"
                            onChange={handleChange}
                        />
                        <div className="image-preview">
                            {formData.tour_image && formData.tour_image.map((image, index) => (
                                <div key={index} style={{ position: 'relative', display: 'inline-block' }}>
                                    <img
                                        src={image.url}
                                        alt={`Preview ${index}`}
                                        style={{ width: '100px', height: '100px', objectFit: 'cover', margin: '5px' }}
                                    />
                                    <span
                                        onClick={() => handleRemoveImage(index)}
                                        style={{
                                            position: 'absolute',
                                            top: '9px',
                                            right: '8px',
                                            cursor: 'pointer',
                                            color: 'red',
                                            background: 'white',
                                            borderRadius: '50px',
                                            padding: '4px',
                                            fontSize: '12px'
                                        }}
                                    >
                                        &times;
                                    </span>
                                </div>
                            ))}
                        </div>

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
                            <label>Giá tiền trẻ nhỏ <span>*</span></label>
                            <input type="number" name="price_toddler" value={child.price_toddler} required onChange={(e) => handleChange(e, index)} />
                        </div>
                        <div className="form-group">
                            <label>Giá tiền em bé <span>*</span></label>
                            <input type="number" name="price_baby" value={child.price_baby} required onChange={(e) => handleChange(e, index)} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Phương tiện ngày đi <span>*</span></label>
                            <input type="text" name="transportion_start" value={child.transportion_start} required onChange={(e) => handleChange(e, index)} />
                        </div>
                        <div className="form-group">
                            <label>Phương tiện ngày về <span>*</span></label>
                            <input type="text" name="transportion_end" value={child.transportion_end} required onChange={(e) => handleChange(e, index)} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Thời gian khởi hành ngày đi <span>*</span></label>
                            <input type="time" name="time_goes_start" value={child.time_goes_start} required onChange={(e) => handleChange(e, index)} />
                        </div>
                        <div className="form-group">
                            <label>Thời gian đến ngày đi <span>*</span></label>
                            <input type="time" name="time_comes_start" value={child.time_comes_start} required onChange={(e) => handleChange(e, index)} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Thời gian khởi hành ngày về <span>*</span></label>
                            <input type="time" name="time_goes_end" value={child.time_goes_end} required onChange={(e) => handleChange(e, index)} />
                        </div>
                        <div className="form-group">
                            <label>Thời gian đến ngày về <span>*</span></label>
                            <input type="time" name="time_comes_end" value={child.time_comes_end} required onChange={(e) => handleChange(e, index)} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Số lượng người tham gia <span>*</span></label>
                            <input type="number" name="total_seats" value={child.total_seats} required onChange={(e) => handleChange(e, index)} />
                        </div>
                        <div className='form-group'>
                            <label>Giảm giá </label>
                            <input type='number' name='price_sale' value={child.price_sale} onChange={(e) => handleChange(e, index)} />
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

