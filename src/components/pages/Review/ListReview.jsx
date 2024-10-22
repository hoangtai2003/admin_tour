import React, { useContext } from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SidebarContext } from '../../../context/SideBarContext';
import Select from 'react-select'
const ListReview = () =>  {
    const [review, setReview] = useState([])
    const { url } = useContext(SidebarContext)
    const status = [
        { value: 'Hiển thị', label: 'Hiển thị' },
        { value: 'Không hiển thị', label: 'Không hiển thị' },
    ];
    useEffect(() => {
        const fetchReview = async() => {
            try {
                const response  = await axios.get(`${url}/review`)
                setReview(response.data.data)
            } catch (error) {
                toast.error("Đã có lỗi xảy ra. Vui lòng thử lại !");
            }
        } 
        fetchReview()
    }, [url])
    const handleStatusChange = async(selectedOption, reviewId) => {
       const updatedStatus = selectedOption ? selectedOption.value : "";
        try {
            await axios.put(`${url}/review/${reviewId}`, { status: updatedStatus })
            setReview((prevReview) => 
                prevReview.map((review) => 
                    review.id === reviewId ? { ...review, status: updatedStatus } : review
                )
            )
            toast.success("Cập nhập thành công !");
        } catch (error) {
            toast.error("Đã có lỗi xảy ra. Vui lòng thử lại !");
        }
    }
    return (
        <section className="content-area-table">
            <ToastContainer />
            <div className="data-table-info">
                <h4 className="data-table-title">Danh sách bình luận</h4>
            </div>
            <div className="data-table-diagram">
                <table>
                    <thead>
                        <tr>
                           <th>STT</th>
                           <th>Tên khách hàng</th>
                           <th>Email</th>
                           <th>Nội dung</th>
                           <th>Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {review?.map((rate, index) => (
                            <tr key={index}>
                                <td className='index'>{index + 1}</td>
                                <td>{rate.reviewsUser.username}</td>
                                <td>{rate.reviewsUser.email}</td>
                                <td>{rate.review_comment}</td>
                                <td>
                                    <Select 
                                        options={status} 
                                        onChange={(selectedOption) => handleStatusChange(selectedOption, rate.id)}
                                        value={status.find(option => option.value === rate.status)}
                                        
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
      </section>
    )
}

export default ListReview
