
import {type FC, useEffect, useRef, useState} from "react";
import { NavLink } from "react-router-dom";
import type { ITab } from "../../modules/ITabs.ts";

interface TabOverflowProps {
    tabs: ITab[];
    onRestore: (tabId: string) => void;
}

const TabOverflow:FC<TabOverflowProps> = ({ tabs,onRestore  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    if (tabs.length === 0) return null;

    return (
        <div ref={dropdownRef} className="relative h-full w-9 shrink-0">
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex h-12 w-9 shrink-0 items-center justify-center bg-[#4690E2] text-white"
            >
                {isOpen ? "▴" : "▾"}
            </button>

            {isOpen && (
                <div className="absolute right-0 top-full z-40 min-w-[180px] rounded-md border border-[#D9DDE2] bg-white py-1 shadow-md">
                    {tabs.map((tab) => (
                        <div key={tab.id} className="flex items-center hover:bg-[#F1F5F8]">
                            <NavLink
                                to={tab.url.startsWith("/") ? tab.url : `/${tab.url}`}
                                onClick={() => setIsOpen(false)}
                                className="min-w-0 flex-1 px-4 py-2 text-sm text-[#7F858D]"
                            >
                                {tab.title}
                            </NavLink>

                            {tab.inOverflow && (
                                <button
                                    type="button"
                                    title="Повернути вкладку"
                                    onClick={() => onRestore(tab.id)}
                                    className="px-3 py-2 text-[#4690E2] hover:bg-[#E2EAF3]"
                                >
                                    ↗
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TabOverflow;
