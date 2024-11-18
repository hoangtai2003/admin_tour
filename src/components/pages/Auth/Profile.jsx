import React, { useContext, useEffect, useState } from 'react'
import { SidebarContext } from '../../../context/SideBarContext'
import { FaSave } from "react-icons/fa";
import axios from 'axios';
import Select from 'react-select'
const Profile = () => {
    const { user, url } = useContext(SidebarContext)
    const [locations, setLocations] = useState([])
    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const response = await axios.get(`${url}/location/all/getAllLocation`);
            
                const filterLocations = response.data.data.filter(location => location.parent_id !== 0);
                const formattedLocations = filterLocations.map(location => ({
                    value: location.id, 
                    label: location.name 
                }));
    
                setLocations(formattedLocations);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách địa điểm:', error);
            }
        };
        fetchLocation()
    }, [url])
    return (
        <section className="content-area">
            <div className="form-container">
                <h4>Cập nhật thông tin cá nhân</h4>
                <form className='form-information'>
                    <div className='form-row'>
                        <div className="form-group">
                            <label>Họ và tên <span>*</span></label>
                            <input type="text" name="username" value={user.username}/>
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" name="email" disabled value={user.email} />
                        </div>
                        <div className="form-group">
                            <label>Số điện thoại <span>*</span></label>
                            <input type="text" name="phone" value={user.phone}/>
                        </div>
                        <div className="form-group">
                            <label>Ngày sinh <span>*</span></label>
                            <input type="date" name="dateBirthday"  value={user.dateBirthday}/>
                        </div>
                    </div>
                    <div className='form-row'>

                    </div>
                    <div className='form-row'>
                        <div className="form-group">
                            <label>Giới tính</label>
                            <select name="gender" >
                                <option value="Male">Nam</option>
                                <option value="Female">Nữ</option>
                                <option value="Other">Khác</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Địa chỉ <span>*</span></label>
                            <input type="text" name="address"  value={user.address}/>
                        </div>
                        {user.userRole.name === "Hướng dẫn viên" ? (
                            <>
                                <div className="form-group">
                                    <label>Khu vực làm việc <span>*</span></label>
                                    <Select
                                        className="custom-select"
                                        options={locations}
                                        // value={selectedLocation}
                                        // onChange={handleLocationEndChange}
                                        placeholder="Tất cả"
                                        isClearable
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Số năm kinh nghiệm <span>*</span></label>
                                    <input type="number" name="experience" />
                                </div>
                            </>
                        ) : "" }
                       
                    </div>
                    <div className="form-group">
                        <label>Mô tả bản thân</label>
                        <textarea rows="10" style={{width: "100%"}} name="bio" ></textarea>
                    </div>
                    {user.userRole.name === "Hướng dẫn viên" ? (
                        <div className='form-group'>
                            <label>Curriculum Vitae (CV)</label>
                            <input type="file" name='CV' />
                        </div>
                    ) : ""}
                    <div className='form-group'>
                        <label>Ảnh đại diện</label>
                        <input type="file" name='user_image' />
                    </div>
                    <div className='form-row'>
                        <div className="form-group">
                            <label>Mật khẩu hiện tại <span>*</span></label>
                            <input type="password" name="currentPassword" />
                        </div>
                        <div className="form-group">
                            <label>Mật khẩu mới <span>*</span></label>
                            <input type="password" name="newPassword"  />
                        </div>
                    </div>
                    <button type="submit" className='btn-profile'><FaSave />Lưu thông tin</button>
                </form>
            </div>
        </section>
    )
}

export default Profile
