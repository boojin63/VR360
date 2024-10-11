import { useCallback, useState } from 'react';
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../Assets/Sidebar.css';

const Sidebar = () => {
    const [toggle, setToggle] = useState(false); 

    const onIconClick = useCallback(() => {
        setToggle((prev) => !prev); 
    }, []);

    return (
        <div>
            <div className={`SidebarContainer ${toggle ? 'open' : ''}`}>
                <div className='SidebarContent'>
                    <div className="SideBtn1"> 월영교 </div>
                </div>
            </div>
            <div className='MenuIcon'>
                <FontAwesomeIcon
                    className={`MenuIcon ${toggle ? 'open' : ''}`}
                    icon={toggle ? faClose : faBars}
                    onClick={onIconClick}
                />
            </div>
        </div>
    );
}

export default Sidebar;
