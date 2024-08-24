import ListLocationAction from "./ListLocationAction"
import { useEffect, useState } from "react";
import axios from "axios";
import '../table.css'
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
const BASE_URL = "http://localhost:4000/api/v1"
const TABLE_HEADS = [
  "STT",
  "Tên địa điểm",
  "Hình ảnh",
  "Trạng thái",
  "Hành Động"
];
const ListLocation = () => {
    const [locations, setLocations] = useState([])
    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/location`)
                setLocations(response.data.data)
            } catch (error) {
                console.error('Error fetching locations:', error);
            }
        }
        fetchLocations();
    }, [])
    const handleDelete = (id) => {
        setLocations(locations.filter(location => location.id !== id))
    }
    return (
      <section className="content-area-table">
        <div className="data-table-info">
            <h4 className="data-table-title">Danh sách địa điểm</h4>
            <Link to="/add-location" className="create"><IoMdAdd className="create_icon"/> Tạo mới</Link>
        </div>
        <div className="data-table-diagram">
          <table>
            <thead>
              <tr>
                {TABLE_HEADS?.map((th, index) => (
                  <th key={index}>{th}</th>
                ))}
              </tr>
            </thead>
            <tbody>
                {locations?.map((location, index) => (
                    <tr key={location.id}>
                        <td>{index + 1}</td>
                        <td>{location.name}</td>
                        <td>
                            <div className="image-container">
                                <img src={location.location_img} alt={location.name} className="image" />
                            </div>
                        </td>
                        <td>{location.status.data[1] === 0 ? "Hiển thị" : "Không hiển thị" }</td>
                        <td className="dt-cell-action">
                            <ListLocationAction id={location.id} onDelete={handleDelete}/>
                        </td>
                    </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>
    );
};

export default ListLocation;
