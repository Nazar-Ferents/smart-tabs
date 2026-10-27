import {Outlet} from "react-router-dom";
import Header from "../components/HeaderComponents/Header.tsx";
import NavBar from "../components/NavComponents/NavBar.tsx";
import SideBar from "../components/SidebarComponents/SideBar.tsx";

const MainLayout = () => {
    return (
        <div className='flex bg-[#F1F5F8] w-full min-h-screen'>
            <SideBar/>
            <div className="flex min-w-0 flex-1 flex-col">
                <Header/>
                <NavBar/>
                <main className="flex-1">
                    <Outlet />
                </main>
            </div>


        </div>
    );
};

export default MainLayout;