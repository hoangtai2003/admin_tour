import React, { useContext, useEffect, useState } from 'react'
import { SidebarContext } from '../../../context/SideBarContext'
import { FaSave } from "react-icons/fa";
import axios from 'axios';
import { toast } from 'react-toastify';
const Profile = () => {
    const [formData, setFormData] = useState({
        username: '',
        phone: '',
        dateBirthday: '',
        gender: '',
        address: '',
        user_experience: '',
        user_description: '',
        user_image: '',
        currentPassword: '',
        newPassword: ''

    })
    const { user, url } = useContext(SidebarContext)
    const [imagePreview, setImagePreview] = useState('');
    const handleChange = async(e) => {
        const { name, value, files } = e.target
        if (name === 'user_image' && files && files[0]) {
            const file = files[0]
            setFormData(prev => ({
                ...prev,
                user_image: file,
            }))
            const previewURL = URL.createObjectURL(file);
            setImagePreview(previewURL);
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    }
    useEffect(() => {
        setFormData({
            username: user.username || '',
            phone: user.phone || '',
            dateBirthday: user.dateBirthday || '',
            gender: user.gender || '',
            address: user.address || '',
            user_experience: user.user_experience || '',
            user_description: user.user_description || '',
            user_image: user.user_image || '',
        });
    }, [user]);
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const formSubmit = new FormData();
            Object.keys(formData).forEach(key => formSubmit.append(key, formData[key]))
            await axios.put(`${url}/users/${user.id}`, formSubmit, {
                headers: {
                    'Content-Type': 'multipart/form-data' 
                }
            })
            toast.success("Cập nhật thông tin thành công !")
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    }
    return (
        <section className="content-area">
            <div className="form-container">
                <h4>Cập nhật thông tin cá nhân</h4>
                <form className='form-information' onSubmit={handleSubmit}>
                    <div className='form-row'>
                        <div className="form-group">
                            <label>Họ và tên <span>*</span></label>
                            <input type="text" name="username" value={formData.username} onChange={handleChange}/>
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" name="email" disabled value={user.email} />
                        </div>
                        <div className="form-group">
                            <label>Số điện thoại <span>*</span></label>
                            <input type="text" name="phone" value={formData.phone} onChange={handleChange}/>
                        </div>
                        <div className="form-group">
                            <label>Ngày sinh <span>*</span></label>
                            <input type="date" name="dateBirthday" value={formData.dateBirthday} onChange={handleChange}/>
                        </div>
                    </div>
                    <div className='form-row'>
                        <div className="form-group">
                            <label>Giới tính</label>
                            <select name="gender" value={formData.gender} onChange={handleChange}>
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Địa chỉ <span>*</span></label>
                            <input type="text" name="address" value={formData.address} onChange={handleChange}/>
                        </div>
                        {user.userRole.name === "Hướng dẫn viên" ? (
                            <>
                                <div className="form-group">
                                    <label>Khu vực làm việc </label>
                                    <input type="text"  disabled value={`TP. ${user.userLocation.name}`} />
                                </div>
                                <div className="form-group">
                                    <label>Số năm kinh nghiệm <span>*</span></label>
                                    <input type="number" name="user_experience" value={formData.user_experience} onChange={handleChange}/>
                                </div>
                            </>
                        ) : "" }
                       
                    </div>
                    <div className='form-group'>
                        <label>Ảnh đại diện</label>
                        <input type="file" name="user_image" onChange={handleChange} />
                        {(imagePreview || user.user_image) && (
                            <div className="image-preview">
                                <img 
                                    src={imagePreview || `${user.user_image}`} 
                                    alt="Profile Preview" 
                                    style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '10px' }} 
                                />
                            </div>
                        )}
                    </div>
                    <div className='form-row'>
                        <div className="form-group">
                            <label>Mật khẩu hiện tại <span>*</span></label>
                            <input type="password" name="currentPassword" onChange={handleChange}/>
                        </div>
                        <div className="form-group">
                            <label>Mật khẩu mới <span>*</span></label>
                            <input type="password" name="newPassword"  onChange={handleChange}/>
                        </div>
                    </div>
                    <button type="submit" className='btn-profile'><FaSave />Lưu thông tin</button>
                </form>
            </div>
        </section>
    )
}

export default Profile
