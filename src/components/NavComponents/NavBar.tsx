import {initialTabs} from "../../data/tabs.ts";
import {useCallback, useEffect, useRef, useState} from "react";
import TabContextMenu from "./TabContextMenu.tsx";
import {NavLink} from "react-router-dom";
import TabOverflow from "./TabOverflow.tsx";

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
    const navRef = useRef<HTMLDivElement>(null);
    const [visibleCount, setVisibleCount] = useState(initialTabs.length);

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
        if (!draggedTabId) return;

        if (draggedTabId === targetTabId) {
            setDraggedTabId(null);
            return;
        }

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

    const activeTabs = tabs.filter((tab) => !tab.inOverflow);
    const manuallyOverflowedTabs = tabs.filter((tab) => tab.inOverflow);

    const TAB_WIDTH = 120;
    const MORE_WIDTH = 40;

    const calculateVisibleTabs = useCallback(() => {
        const container = navRef.current;
        if (!container) return;

        const availableWidth = container.clientWidth;
        const maxTabs = Math.floor(availableWidth / TAB_WIDTH);

        if (maxTabs >= activeTabs.length) {
            setVisibleCount(activeTabs.length);
        } else {
            const count = Math.floor(
                Math.max(0, availableWidth - MORE_WIDTH) / TAB_WIDTH
            );

            setVisibleCount(Math.min(count, Math.max(0, activeTabs.length - 1)));
        }
    }, [activeTabs.length]);

    useEffect(() => {
        const container = navRef.current;
        if (!container) return;

        const observer = new ResizeObserver(calculateVisibleTabs);

        observer.observe(container);
        calculateVisibleTabs();

        return () => observer.disconnect();
    }, [calculateVisibleTabs]);

    const visibleTabs = activeTabs.slice(0, visibleCount);
    const overflowTabs = [
        ...activeTabs.slice(visibleCount),
        ...manuallyOverflowedTabs,
    ];
    return (
        <div ref={navRef} className="relative flex h-12 w-full min-w-0 items-center bg-[#F1F5F8]">

            {visibleTabs.map((tab) => {
                const isDragged = draggedTabId === tab.id;

                return (
                    <div
                        key={tab.id}
                        onContextMenu={(event) => handleContextMenu(event, tab.id)}
                        className={`group relative flex h-full min-w-0 flex-1 items-center transition-colors duration-200 ${
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
                            onDragEnd={() => setDraggedTabId(null)}
                            to={tab.url.startsWith("/") ? tab.url : `/${tab.url}`}
                            className={({ isActive }) =>
                                `relative flex h-12 w-full min-w-[120px] items-center justify-center gap-2 border-t-2 p-[10px] font-poppins text-[14px] font-medium ${
                                    isActive ? "border-t-[#4690E2]" : "border-t-transparent"
                                } ${
                                    isDragged ? "bg-[#7F858D] text-white" : "text-[#7F858D]"
                                }`
                            }
                        >

                            <img
                                src={tab.icon}
                                alt=""
                                className="h-[16px] w-[16px] shrink-0 object-contain"
                            />
                            {!tab.pinned && <span className="whitespace-nowrap">{tab.title}</span>}
                        </NavLink>
                        {!tab.pinned && (
                            <button
                                type="button"
                                title="Перемістити в меню"
                                onClick={() => {
                                    setTabs((currentTabs) =>
                                        currentTabs.map((item) =>
                                            item.id === tab.id
                                                ? { ...item, inOverflow: true }
                                                : item
                                        )
                                    );
                                }}
                                className="absolute right-2 top-1/2 z-20 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full bg-[#EE3F3E] text-[16px] font-medium leading-none text-white opacity-0 transition-opacity group-hover:opacity-100"
                            >
                                ×
                            </button>
                        )}
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
            <TabOverflow
                tabs={overflowTabs}
                onRestore={(tabId) => {
                    setTabs((currentTabs) =>
                        currentTabs.map((tab) =>
                            tab.id === tabId
                                ? { ...tab, inOverflow: false }
                                : tab
                        )
                    );
                }}
            />
        </div>
    );
};

export default NavBar;