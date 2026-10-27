import {initialTabs} from "../../data/tabs.ts";
import {NavLink} from "react-router-dom";
import {useState} from "react";

const NavBar = () => {
    const [tabs, setTabs] = useState(initialTabs);
    const [draggedTabId, setDraggedTabId] = useState<string | null>(null);



    const handleDrop = (targetTabId: string) => {
        if (!draggedTabId || draggedTabId === targetTabId) return;

        setTabs((currentTabs) => {
            const updatedTabs = [...currentTabs];

            const draggedIndex = updatedTabs.findIndex(
                (tab) => tab.id === draggedTabId
            );

            const [draggedTab] = updatedTabs.splice(draggedIndex, 1);

            const targetIndex = updatedTabs.findIndex(
                (tab) => tab.id === targetTabId
            );

            updatedTabs.splice(targetIndex, 0, draggedTab);

            return updatedTabs;
        });

        setDraggedTabId(null);
    };

    return (
        <div className=' flex h-12 items-center bg-[#F1F5F8]'>

            {tabs.map((tab) => (
            <div key={tab.id} className={`flex h-full items-center transition-colors duration-200
            ${draggedTabId === tab.id ? "bg-[#F1F5F8]" 
                : "bg-[#FEFEFE] hover:bg-[#F1F5F8] has-[a.active]:bg-[#F1F5F8]"}`} >
                <NavLink
                    draggable
                    onDragStart={() => setDraggedTabId(tab.id)}
                    onDragOver={(event) => {
                        event.preventDefault();}}
                    onDrop={()=>handleDrop(tab.id)}
                    to={tab.url}
                    className={`flex h-[48px] w-[148px] items-center justify-center p-[10px] font-poppins text-[14px] font-medium ${
                        draggedTabId === tab.id
                            ? "bg-[#7F858D] text-white"
                            : "text-[#7F858D]"
                    }`}
                >
                    {tab.title}
                </NavLink>

            </div>


            ))}
        </div>
    );
};

export default NavBar;