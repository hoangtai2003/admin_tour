import React, { useState, useEffect } from 'react';
import './add-tour.css';
import Select from 'react-select';
import axios from 'axios';
import { BASE_URL } from '../../../utils/config'
import { CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FaSave } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import { useNavigate, useParams } from 'react-router-dom'
const  EditTour = () =>  {
    const { id } = useParams()  
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        description_itinerary: '',
        price: '',
        duration: '',
        departure_city: '',
        transportations: '',
        // tour_image: '',
        start_date: '',
        end_date: '',
        price_adult: '',
        price_child: '',
        total_seats: '',
        introduct_tour: '',
        location_ids: [] 
    });
    const [locations, setLocations] = useState([]);

    const [selectedLocations, setSelectedLocations] = useState([]);

    useEffect(() => {
        const fetchTourData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/tours/${id}`);
                const tourData = response.data.data;
                // Extract location IDs
                const locationIds = tourData.tourLocations.map(loc => loc.location_id);

                // Set form data
                setFormData({
                    name: tourData.name,
                    description_itinerary: tourData.description_itinerary,
                    price: tourData.price,
                    duration: tourData.duration,
                    departure_city: tourData.departure_city,
                    transportations: tourData.transportations,
                    start_date: tourData.tourChildren[0]?.start_date || '',
                    end_date: tourData.tourChildren[0]?.end_date || '',
                    price_adult: tourData.tourChildren[0]?.price_adult || '',
                    price_child: tourData.tourChildren[0]?.price_child || '',
                    total_seats: tourData.tourChildren[0]?.total_seats || '',
                    introduct_tour: tourData.introduct_tour,
                    location_ids: locationIds || []
                });

                // Map tourLocations to select options
                const selectedOptions = tourData.tourLocations.map(loc => ({
                    value: loc.location_id,
                    label: loc.location.name
                }));
                setSelectedLocations(selectedOptions);
            } catch (error) {
                console.error('Error fetching tour data:', error);
            }
        };

        // Fetch tour data only when locations are loaded
        if (locations.length > 0) {
            fetchTourData();
        }
    }, [id, locations]);


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
        const { name, value } = e.target;
    
        if (name === 'start_date' || name === 'end_date') {
            // Chuyển đổi từ mm/dd/yyyy sang yyyy/mm/dd
            const [year, month, day] = value.split('-'); 
            const formattedDate = `${year}-${month}-${day}`;;
    
            setFormData({
                ...formData,
                [name]: formattedDate,
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };
    
    
    // Xử lý lấy dữ liệu từ Select
    const handleSelectChange = (selectedOptions) => {
        setSelectedLocations(selectedOptions);
        const ids = selectedOptions.map(option => option.value);
        setFormData(prevState => ({
            ...prevState,
            location_ids: ids
        }));
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
            const res = await fetch(`${BASE_URL}/tours/${id}`, {
                method: 'put',
                headers: {
                    'content-type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(formData)
            });
            const result = await res.json();
            if (!res.ok) {
                return alert(result.message);
            }
            navigate("/list-tour");
        } catch (error) {
            alert(error.message);
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
                    <input type="file" name="tour_image" value={formData.tour_image}/>
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

export default EditTour;

