import {initialTabs} from "../../data/tabs.ts";
import {NavLink} from "react-router-dom";

const NavBar = () => {

    return (
        <div className=' flex h-12 items-center bg-[#FEFEFE]'>

            {initialTabs.map((tab) => (
            <div key={tab.id} className="flex h-full items-center
            bg-[#FEFEFE] hover:bg-[#F1F5F8] has-[a.active]:bg-[#F1F5F8]" >
                <NavLink
                    to={tab.url}
                    className="flex h-[48px] w-[148px] items-center justify-center
      p-[10px] font-poppins text-[14px] font-medium text-[#7F858D]"
                >
                    {tab.title}
                </NavLink>

            </div>


            ))}
        </div>
    );
};

export default NavBar;