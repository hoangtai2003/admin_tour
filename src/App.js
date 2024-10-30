import "./app.css";
import { Routes, Route } from "react-router-dom";
import BaseLayout from "./components/layout/BaseLayout";
import PrivateRoute from "./components/pages/Auth/PrivateRoute";
import Login from "./components/pages/Auth/Login"
import ListTour from "./components/pages/Tour/ListTour"
import AddTour from "./components/pages/Tour/AddTour";
import EditTour from "./components/pages/Tour/EditTour"
import ListLocation from "./components/pages/Location/ListLocation";
import AddLocation from "./components/pages/Location/AddLocation";
import EditLocation from "./components/pages/Location/EditLocation";
import ListUser from "./components/pages/User/ListUser"
import AddUser from "./components/pages/User/AddUser"
import ListBooking from "./components/pages/Booking/ListBooking";
import ListNews from "./components/pages/News/ListNews"
import ListCategory from './components/pages/Category/ListCategory'
import AddCategory from "./components/pages/Category/AddCategory";
import EditCategory from "./components/pages/Category/EditCategory";
import EditNews from "./components/pages/News/EditNews"
import AddNews from "./components/pages/News/AddNews";
import Dashboard from "./components/pages/Dashboard/Dashboard"
import ListReview from "./components/pages/Review/ListReview";
import Unauthorized from "./components/pages/Unauthorized/Unauthorized";
import ListRole from "./components/pages/Role/ListRole";
import AddRole from "./components/pages/Role/AddRole"
import EditRole from "./components/pages/Role/EditRole";
import ListHotel from "./components/pages/Hotel/ListHotel"
import AddHotel from "./components/pages/Hotel/AddHotel";
import EditHotel from "./components/pages/Hotel/EditHotel";
import PageNotFound from "./components/pages/PageNotFound/PageNotFound";
import Page from "./components/pages/PageNotFound/Page";
const  App = () => {
  return (
    <>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<BaseLayout />}>
                <Route path="/list-tour" element={
                    <PrivateRoute requiredPermission="danh-sach-tour">
                        <ListTour />
                    </PrivateRoute>
                } />
                <Route path="/add-tour" element={
                    <PrivateRoute requiredPermission="them-tour">
                        <AddTour />
                    </PrivateRoute>
                } />
                <Route path="/edit-tour/:id" element={
                    <PrivateRoute requiredPermission="sua-tour"> 
                        <EditTour />
                    </PrivateRoute>
                } />
                <Route path="/list-location" element={
                    <PrivateRoute requiredPermission="danh-sach-dia-diem">
                        <ListLocation />
                    </PrivateRoute>
                } />
                <Route path="/add-location" element={
                    <PrivateRoute requiredPermission="them-dia-diem">
                        <AddLocation />
                    </PrivateRoute>
                } />
                <Route path="/edit-location/:id" element={
                    <PrivateRoute requiredPermission="sua-dia-diem">
                        <EditLocation />
                    </PrivateRoute>
                } />
                <Route path="/list-user" element={
                    <PrivateRoute requiredPermission="danh-sach-user">
                        <ListUser />
                    </PrivateRoute>
                } />
                <Route path="/add-user" element={
                    <PrivateRoute requiredPermission="them-user">
                        <AddUser />
                    </PrivateRoute>
                } />
                <Route path="/list-booking" element={
                    <PrivateRoute requiredPermission="danh-sach-dat-tour">
                        <ListBooking />
                    </PrivateRoute>
                } />
                <Route path="/list-news" element={
                    <PrivateRoute requiredPermission="danh-sach-bai-viet">
                        <ListNews />
                    </PrivateRoute>
                } />
                <Route path="/list-category" element={
                    <PrivateRoute  requiredPermission="danh-sach-danh-muc">
                        <ListCategory />
                    </PrivateRoute>
                } />
                <Route path="/add-category" element={
                    <PrivateRoute requiredPermission="them-danh-muc">
                        <AddCategory />
                    </PrivateRoute>
                } />
                <Route path="/edit-category/:id" element={
                    <PrivateRoute requiredPermission="sua-danh-muc">
                        <EditCategory />
                    </PrivateRoute>
                } />
                <Route path="/add-news" element={
                    <PrivateRoute requiredPermission="them-bai-viet">
                        <AddNews />
                    </PrivateRoute>
                } />
                <Route path="/edit-news/:id" element={
                    <PrivateRoute requiredPermission="sua-bai-viet">
                        <EditNews />
                    </PrivateRoute>
                } />
                <Route path="/thong-ke" element={
                    <PrivateRoute requiredPermission="thong-ke">
                        <Dashboard />
                    </PrivateRoute>
                } />
                <Route path="/list-review" element={
                    <PrivateRoute requiredPermission="danh-sach-binh-luan">
                        <ListReview />
                    </PrivateRoute>
                } />
                <Route path="/list-role" element={
                    <PrivateRoute requiredPermission="danh-sach-vai-tro">
                        <ListRole />
                    </PrivateRoute>
                } />
                <Route path="/add-role" element={
                    <PrivateRoute requiredPermission="them-vai-tro">
                        <AddRole />
                    </PrivateRoute>
                } />
                <Route path="/edit-role/:id" element={
                    <PrivateRoute requiredPermission="sua-vai-tro">
                        <EditRole />
                    </PrivateRoute>
                } />
                <Route path="/list-hotel" element={
                    <PrivateRoute requiredPermission="danh-sach-khach-san">
                        <ListHotel />
                    </PrivateRoute>
                } />
                <Route path="/add-hotel" element={
                    <PrivateRoute requiredPermission="them-khach-san">
                        <AddHotel />
                    </PrivateRoute>
                } />
                <Route path="/edit-hotel/:slug" element={
                    <PrivateRoute requiredPermission="sua-khach-san">
                        <EditHotel />
                    </PrivateRoute>
                } />
                <Route path="/unauthorized" element={<Unauthorized />}></Route>
                <Route path="/home" element={<Page />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    </>
  );
}

export default App;
