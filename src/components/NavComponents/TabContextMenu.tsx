import type {FC} from "react";
import type { RefObject } from "react";


interface TabContextMenuProps {
    x: number;
    y: number;
    pinned: boolean;
    onPin: () => void;
    menuRef: RefObject<HTMLDivElement | null>;
}

const TabContextMenu:FC<TabContextMenuProps> = ({ x, y, pinned, onPin, menuRef }) => {
    return (
        <div
            ref={menuRef}
            className="fixed z-50 flex h-[44px] w-[155px] items-center justify-center rounded-[6px] border border-[#D9DDE2] bg-white"
            style={{ left: x, top: y }}
        >
            <button
                type="button"
                onClick={onPin}
                className="h-full w-full font-poppins text-[14px] font-medium leading-[165%] text-[#7F858D]"
            >
                {pinned ? "Tab lösen" : "Tab anpinnen"}
            </button>
        </div>
    );
};

export default TabContextMenu;