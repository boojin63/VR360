import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../Assets/Sidebar.css';

const Sidebar = () => {
    const [toggle, setToggle] = useState(false);
    const [themeOpen, setThemeOpen] = useState(false);
    const navigate = useNavigate();


    const onIconClick = useCallback(() => {
        setToggle((prev) => !prev);
    }, []);


    const onThemeClick = useCallback(() => {
        setThemeOpen((prev) => !prev);
    }, []);

    const toBridge = () => {
        navigate('/');
    };


    const toPark = () => {
        navigate('/Park');
    };

    return (
        <div>
            <div className={`SidebarContainer ${toggle ? 'open' : ''}`}>
                <div className='SidebarContent'>
                    <div className='SideBtn1' onClick={onThemeClick}>
                        테마
                    </div>

                    {themeOpen && (
                        <div className='ThemeSubMenu'>
                            <div className="SideBtn3" onClick={toBridge}>- 월영교</div>
                            <div className="SideBtn4" onClick={toPark}>- 물길공원</div>
                        </div>
                    )}

                    <div className='SideBtn2' style={{ marginTop: themeOpen ? '5px' : '10px' }}>
                        공지사항
                    </div>
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
};

export default Sidebar;
