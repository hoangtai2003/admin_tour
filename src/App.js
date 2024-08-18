import { useContext, useEffect } from "react";
import "./app.css";
import { ThemeContext } from "./context/ThemeContext";
import { DARK_THEME, LIGHT_THEME } from ".//constants/themeConstants";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MoonIcon from "./assets/icons/moon.svg";
import SunIcon from "./assets/icons/sun.svg";
import BaseLayout from "./components/layout/BaseLayout";
import {PageNotFound } from "./components/screens";
import ListTour from "./components/pages/Tour/ListTour/ListTour"

function App() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    useEffect(() => {
        if (theme === DARK_THEME) {
            document.body.classList.add("dark-mode");
        } else {
            document.body.classList.remove("dark-mode");
        }
    }, [theme]);

  return (
    <>
        <Router>
            <Routes>
                <Route element={<BaseLayout />}>
                <Route path="/list-tour" element={<ListTour />} />
                <Route path="*" element={<PageNotFound />} />
            </Route>
            </Routes>

            <button
                type="button"
                className="theme-toggle-btn"
                onClick={toggleTheme}
            >
            <img
                className="theme-icon"
                src={theme === LIGHT_THEME ? SunIcon : MoonIcon}
            />
            </button>
        </Router>
    </>
  );
}

export default App;
