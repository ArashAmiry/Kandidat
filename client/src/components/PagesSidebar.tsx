import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useState } from "react";

function PagesSidebar({ pagesTitles, setCurrentPageIndex }: { pagesTitles: string[], setCurrentPageIndex: (index: number) => void }) {
    const [collapsed, setCollapsed] = useState(false);

    // Function to toggle the collapse state
    const toggleSidebar = () => setCollapsed(!collapsed);

    return (
        <Sidebar className="sidebar" collapsed={collapsed} backgroundColor="rgb(242, 242, 242, 1)">
            <Menu>
                <MenuItem
                    onClick={() => toggleSidebar()}
                    icon={<MenuOutlinedIcon />}
                    className="d-flex justify-content-center align-items-center"
                />
                {!collapsed &&
                    pagesTitles.map((pageTitle, index) => {
                        const title = pageTitle || `Page ${index + 1}`;
                        return (
                            <MenuItem key={index} onClick={() => setCurrentPageIndex(index)}>
                                {title}
                            </MenuItem>
                        );
                    })}
            </Menu>
        </Sidebar>
    )
}

export default PagesSidebar;