import {initialTabs} from "../../data/tabs.ts";
import {useEffect, useRef, useState} from "react";
import TabContextMenu from "./TabContextMenu.tsx";
import {NavLink} from "react-router-dom";

const NavBar = () => {
    const [tabs, setTabs] = useState(() => {
        try {
            const savedTabs = localStorage.getItem("tabs");

            if (!savedTabs) return initialTabs;

            const parsedTabs = JSON.parse(savedTabs);

            if (!Array.isArray(parsedTabs)) return initialTabs;

            return parsedTabs;
        } catch {
            return initialTabs;
        }
    });
    const [draggedTabId, setDraggedTabId] = useState<string | null>(null);
    const [contextMenuTabId, setContextMenuTabId] = useState<string | null>(null);
    const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
    const contextMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        localStorage.setItem("tabs", JSON.stringify(tabs));
    }, [tabs]);

    useEffect(() => {
        if (!contextMenuTabId) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (
                contextMenuRef.current &&
                !contextMenuRef.current.contains(event.target as Node)
            ) {
                setContextMenuTabId(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [contextMenuTabId]);


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

    const handleContextMenu = (
        event: React.MouseEvent<HTMLDivElement>,
        tabId: string
    ) => {
        event.preventDefault();

        setContextMenuTabId(tabId);
        setContextMenuPosition({
            x: event.clientX,
            y: event.clientY,
        });
    };

    const handlePin = (tabId: string) => {
        setTabs((currentTabs) => {
            const updatedTabs = currentTabs.map((tab) =>
                tab.id === tabId
                    ? { ...tab, pinned: !tab.pinned }
                    : tab
            );

            return updatedTabs.sort(
                (a, b) => Number(b.pinned) - Number(a.pinned)
            );
        });
    };

    return (
        <div className=' flex h-12 items-center bg-[#F1F5F8]'>

            {tabs.map((tab) => {
                const isDragged = draggedTabId === tab.id;

                return (
                    <div
                        key={tab.id}
                        onContextMenu={(event) => handleContextMenu(event, tab.id)}
                        className={`flex h-full items-center transition-colors duration-200 ${
                            isDragged
                                ? "bg-[#F1F5F8]"
                                : "bg-[#FEFEFE] hover:bg-[#F1F5F8] has-[a.active]:bg-[#F1F5F8]"
                        }`}
                    >
                        <NavLink
                            draggable={!tab.pinned}
                            onDragStart={(event) => {
                                if (tab.pinned) {
                                    event.preventDefault();
                                    return;
                                }

                                setDraggedTabId(tab.id);
                            }}
                            onDragOver={(event) => event.preventDefault()}
                            onDrop={() => handleDrop(tab.id)}
                            to={tab.url.startsWith("/") ? tab.url : `/${tab.url}`}
                            className={`flex h-[48px] w-[148px] items-center justify-center p-[10px] font-poppins text-[14px] font-medium ${
                                isDragged ? "bg-[#7F858D] text-white" : "text-[#7F858D]"
                            }`}
                        >
                            {tab.title}
                        </NavLink>
                    </div>
                );
            })}
            {contextMenuTabId && (
                <TabContextMenu
                    x={contextMenuPosition.x}
                    y={contextMenuPosition.y}
                    pinned={tabs.find((tab) => tab.id === contextMenuTabId)?.pinned ?? false}
                    onPin={() => {
                        handlePin(contextMenuTabId);
                        setContextMenuTabId(null);
                    }}
                    menuRef={contextMenuRef}
                />
            )}
        </div>
    );
};

export default NavBar;