import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";


const BaseLayout = () => {
  return (
    <main className="page-wrapper">
        <Sidebar/>
        <div className="content-wrapper">
            <Outlet />
        </div>
    </main>
  );
};

export default BaseLayout;
