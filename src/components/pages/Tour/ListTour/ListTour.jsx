import LisTourAction from "./ListTourAction";
import "./list-tour.css";
import { BASE_URL } from '../../../../utils/config';
import useFetch from '../../../../hooks/useFetch';

const TABLE_HEADS = [
  "STT",
  "Tiêu đề",
  "Hình ảnh",
  "Lịch trình / Giá",
  "Thông tin / Địa điểm",
  "Hành Động"
];

const ListTour = () => {
    const {data: toursData, error, loading } = useFetch(`${BASE_URL}/tours`);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
  
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
                {tours?.map((tour, index) => (
                    <tr key={tour.id}>
                        <td>{index + 1}</td>
                        <td>{tour.name}</td>
                        <td>
                            <div className="tour-image-container">
                                <img src={tour.tour_image} alt={tour.name} className="tour-image" />
                            </div>
                        </td>
                        <td>
                            <p><b>Lịch trình: </b>{tour.description_itinerary}</p>
                            <p><b>Hành trình: </b>{tour.duration}</p>
                            {tour.tourChildren.length > 0 && (
                                <>
                                <p><b>Số người: </b>{tour.tourChildren[0].total_seats}</p>
                                <p><b>Đã đăng ký: </b>{}</p>
                                <p><b>Giá người lớn: </b>{tour.tourChildren[0].price_adult} vnd</p>
                                <p><b>Giá trẻ em: </b>{tour.tourChildren[0].price_child} vnd</p>
                                </>
                            )}
                        </td>
                        <td>
                            <p><b>Địa điểm: </b>
                                {tour.tourLocations.map((tourLocation, i) => (
                                    <span key={i}>{tourLocation.location.name}{i < tour.tourLocations.length - 1 ? ' - ' : ''}</span>
                                ))}
                            </p>
                            <p><b>Di chuyển: </b>{tour.transportations}</p>
                            <p><b>Điểm xuất phát: </b>{tour.departure_city}</p>
                            {tour.tourChildren.length > 0 && (
                                <>
                                <p><b>Ngày đi: </b>{tour.tourChildren[0].start_date}</p>
                                <p><b>Ngày về: </b>{tour.tourChildren[0].end_date}</p>
                                </>
                            )}
                        </td>
                        <td className="dt-cell-action">
                            <LisTourAction />
                        </td>
                    </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>
    );
};

export default ListTour;
