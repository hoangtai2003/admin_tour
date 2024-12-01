import React, { useContext, useEffect, useState } from 'react'
import { SidebarContext } from '../../../context/SideBarContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { FaSave } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import Select from 'react-select';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'; 
const AddHotel = () => {
    const [formData, setFormData] = useState({
        hotel_name: '',
        hotel_price: '',
        hotel_title: '',
        hotel_address: '',
        hotel_phone: '',
        hotel_image: '',
        location_id: '',
        hotel_description: ''
    }) 
    const { url } = useContext(SidebarContext)
    const navigate = useNavigate()
    const [location, setLocation] = useState()
    useEffect(() => {
        const fetchLocation = async(req, res) => {
            try {
                const response = await axios.get(`${url}/location/all/getAllLocation`)
                const location = response.data.data.map(loca => ({
                    value: loca.id,
                    label: loca.name
                }))
                setLocation(location)
            } catch (error) {
                toast.error('Dữ liệu địa điểm trống!');
            }
        }
        fetchLocation()
    }, [url])
    const handleChange = async(e) => {
        const { name, value, files } = e.target
        if (name === "hotel_image" && files && files[0]){
            const file = files[0]
            const imageUrl = URL.createObjectURL(file)

            setFormData(prev => ({
                ...prev,
                hotel_image: file,
            imagePreview: imageUrl
            }))
        } else {
            setFormData(prev => ({...prev, [name]:value }))
        }
    }

    const handleSelectChange = (selectedOption) => {
        setFormData(prev => ({...prev, location_id: selectedOption ? selectedOption.value : ""}))
    }

    const handleEditorChange = (event, editor, fieldName) => {
        const data = editor.getData()
        setFormData(prev => ({ ...prev, [fieldName]: data }))
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const formSubmit = new FormData();
            Object.keys(formData).forEach(key => formSubmit.append(key, formData[key]))
            await axios.post(`${url}/hotel`, formSubmit, {
                headers: {
                    'Content-Type': 'multipart/form-data' 
                }
            })
            navigate("/list-hotel")
            toast.success("Tạo khách sạn thành công !")
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="tour-form-container">
                <div className='tour-form-left'>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Tên khách sạn <span>*</span></label>
                            <input type="text" name="hotel_name" required onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Giá tiền <span>*</span></label>
                            <input type="number" name="hotel_price" required onChange={handleChange} />
                        </div>
                    </div>
                    <div className='form-row'>
                        <div className="form-group">
                            <label>Địa điểm<span>*</span></label>
                            <Select
                                options={location}
                                onChange={handleSelectChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Số điện thoại <span>*</span></label>
                            <input type="text" name="hotel_phone" required onChange={handleChange} />
                        </div>
                    </div>
                    <div className='form-row'>
                        <div className="form-group">
                            <label>Địa chỉ <span>*</span></label>
                            <input type="text" name="hotel_address" required onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Hình ảnh </label>
                            <input type="file" name="hotel_image" onChange={handleChange} />
                            {formData.imagePreview && (
                                <div className="image-preview">
                                    <img src={formData.imagePreview} alt="Location Preview" style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '10px' }} />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Tiêu đề khách sạn</label>
                        <textarea rows="10" style={{width: "100%"}} onChange={handleChange} name='hotel_title'/>
                    </div>
                    <div className="form-group">
                        <label>Mô tả khách sạn <span>*</span></label>
                        <CKEditor
                            editor={ClassicEditor}
                            config={{
                                ckfinder: {
                                uploadUrl: 'http://localhost:4000/api/v1/hotel/upload'
                                }
                            }}
                            onChange={(event, editor) => handleEditorChange(event, editor, 'hotel_description')}
                        />
                    </div>
                    <div className="form-actions">
                        <button type="submit"><FaSave className='icon' />Lưu dữ liệu</button>
                        <button type="button" ><GrPowerReset className='icon' /> Reset</button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default AddHotel
