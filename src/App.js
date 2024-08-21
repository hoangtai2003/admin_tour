import "./app.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BaseLayout from "./components/layout/BaseLayout";
import {PageNotFound } from "./components/screens";
import ListTour from "./components/pages/Tour/ListTour"
import AddTour from "./components/pages/Tour/AddTour";
import EditTour from "./components/pages/Tour/EditTour"
import ListLocation from "./components/pages/Location/ListLocation";
const  App = () => {
  return (
    <>
        <Router>
            <Routes>
                <Route element={<BaseLayout />}>
                <Route path="/list-tour" element={<ListTour />} />
                <Route path="/add-tour" element={<AddTour />} />
                <Route path="/edit-tour/:id" element={<EditTour />} />
                <Route path="/list-location" element={<ListLocation />} />
                <Route path="*" element={<PageNotFound />} />
            </Route>
            </Routes>
        </Router>
    </>
  );
}

export default App;
