import LisTourAction from "./ListTourAction";
import "./list-tour.css";
import { BASE_URL } from '../../../../utils/config'
import useFetch from '../../../../hooks/useFetch'
const TABLE_HEADS = [
  "Tên tour",
  "Mã tour",
  "Giá tiền",
  "Mô tả tour",
  "Thời gian tour",
  "Ngày khởi hành",
  "Ngày kết thúc",
  "Nơi khởi hành",
  "Tổng số chỗ",
  "Số chỗ còn trống",
  "Hành Động"
];


const ListTour = () => {
    const {data: toursData, error, loading } = useFetch(`${BASE_URL}/tours`);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
  
    // Ensure toursData is an array before mapping
    const tours = toursData?.data;
  
    return (
      <section className="content-area-table">
        <div className="data-table-info">
          <h4 className="data-table-title">List Tour</h4>
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
                {
                  tours?.map((tour) => (
                      <tr key={tour.id}>
                          <td>{tour.name}</td>
                          <td>{tour.tour_code}</td>
                          <td>${tour.price}</td>
                          <td>{tour.description}</td>
                          <td>{tour.duration}</td>
                          <td>{tour.start_date}</td>
                          <td>{tour.end_date}</td>  
                          <td>{tour.departure_city}</td>     
                          <td>{tour.total_seats}</td>  
                          <td>{tour.seats_available}</td>         
                          <td className="dt-cell-action">
                              <LisTourAction />
                          </td>
                      </tr>
                  ))
                }
            </tbody>
          </table>
        </div>
      </section>
    );
  };
  

export default ListTour;
