import "./app.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BaseLayout from "./components/layout/BaseLayout";
import {PageNotFound } from "./components/screens";
import ListTour from "./components/pages/Tour/ListTour/ListTour"
import AddTour from "./components/pages/Tour/AddTour/AddTour";
import ListLocation from "./components/pages/Location/ListLocation/ListLocation";
const  App = () => {
  return (
    <>
        <Router>
            <Routes>
                <Route element={<BaseLayout />}>
                <Route path="/list-tour" element={<ListTour />} />
                <Route path="/add-tour" element={<AddTour />} />
                <Route path="/list-location" element={<ListLocation />} />
                <Route path="*" element={<PageNotFound />} />
            </Route>
            </Routes>
        </Router>
    </>
  );
}

export default App;
