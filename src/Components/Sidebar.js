import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../Assets/Sidebar.css';

const Sidebar = () => {
    const [toggle, setToggle] = useState(false); 
    const navigate = useNavigate(); 

    const onIconClick = useCallback(() => {
        setToggle((prev) => !prev); 
    }, []);

    const ToBridge = () =>{
        navigate('/');
    }

    const ToPark = () =>{
        navigate('/Park');
    }

    return (
        <div>
            <div className={`SidebarContainer ${toggle ? 'open' : ''}`}>
                <div className='SidebarContent'>
                    <div className="SideBtn1" onClick={ToBridge}> 월영교 </div>
                    <div className="SideBtn2" onClick={ToPark}> 물길공원 </div>
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
