import "./app.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BaseLayout from "./components/layout/BaseLayout";
import { PageNotFound } from "./components/screens";
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
const  App = () => {
  return (
    <>
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route element={<BaseLayout />}>
                    <Route path="/list-tour" element={
                        <PrivateRoute>
                            <ListTour />
                        </PrivateRoute>
                    } />
                    <Route path="/add-tour" element={
                        <PrivateRoute>
                            <AddTour />
                        </PrivateRoute>
                    } />
                    <Route path="/edit-tour/:id" element={
                        <PrivateRoute>
                            <EditTour />
                        </PrivateRoute>
                    } />
                    <Route path="/list-location" element={
                        <PrivateRoute>
                            <ListLocation />
                        </PrivateRoute>
                    } />
                    <Route path="/add-location" element={
                        <PrivateRoute>
                            <AddLocation />
                        </PrivateRoute>
                    } />
                    <Route path="/edit-location/:id" element={
                        <PrivateRoute>
                            <EditLocation />
                        </PrivateRoute>
                    } />
                    <Route path="/list-user" element={
                        <PrivateRoute>
                            <ListUser />
                        </PrivateRoute>
                    } />
                    <Route path="/add-user" element={
                        <PrivateRoute>
                            <AddUser />
                        </PrivateRoute>
                    } />
                    <Route path="/list-booking" element={
                        <PrivateRoute>
                            <ListBooking />
                        </PrivateRoute>
                    } />
                    <Route path="/list-news" element={
                        <PrivateRoute>
                            <ListNews />
                        </PrivateRoute>
                    } />
                    <Route path="/list-category" element={
                        <PrivateRoute>
                            <ListCategory />
                        </PrivateRoute>
                    } />
                    <Route path="/add-category" element={
                        <PrivateRoute>
                            <AddCategory />
                        </PrivateRoute>
                    } />
                    <Route path="/edit-category/:id" element={
                        <PrivateRoute>
                            <EditCategory />
                        </PrivateRoute>
                    } />
                    <Route path="/add-news" element={
                        <PrivateRoute>
                            <AddNews />
                        </PrivateRoute>
                    } />
                    <Route path="/edit-news/:id" element={
                        <PrivateRoute>
                            <EditNews />
                        </PrivateRoute>
                    } />
                    <Route path="/dashboard" element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    } />
                    <Route path="*" element={<PageNotFound />} />
                </Route>
            </Routes>
        </Router>
    </>
  );
}

export default App;
