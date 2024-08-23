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
                    <Route path="*" element={<PageNotFound />} />
                </Route>
            </Routes>
        </Router>
    </>
  );
}

export default App;
