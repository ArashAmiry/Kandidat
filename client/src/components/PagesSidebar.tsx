import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useEffect, useState } from "react";

function PagesSidebar({ pagesTitles, setCurrentPageIndex, currentStep }: { pagesTitles: string[], setCurrentPageIndex: (index: number) => void, currentStep?: number }) {
    const [collapsed, setCollapsed] = useState(false);

    // Function to toggle the collapse state
    const toggleSidebar = () => setCollapsed(!collapsed);

    useEffect(() => {
        if (currentStep === 3){
            setCollapsed(true);
        } else{
            setCollapsed(false);
        }
    }, [currentStep])

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