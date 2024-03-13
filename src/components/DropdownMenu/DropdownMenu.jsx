import React, { useState, useRef, useEffect } from 'react';

import WithTranslation from '../hoc/WithTranslation';

const DropdownMenu = ({ isOpen, onExitClick, onProfileClick,t }) => {
    const dropdownRef = useRef(null);
    const userLinkRef = useRef(null); 
 
    const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false);
    const handleClickOutside = (evt) => {
        if (!dropdownRef.current.contains(evt.target)) {
            onExitClick();
        }
    };

    const handleClickInside = (evt) => {
        if (userLinkRef.current && userLinkRef.current.contains(evt.target)) {
            // Клик внутри дропдауна, но не на пунктах меню
            onProfileClick();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('mousedown', handleClickInside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('mousedown', handleClickInside);
        };
    }, [onExitClick, onProfileClick]);



    return (
        <div className={`dropdown-menu ${isOpen ? 'open' : ''}`} ref={dropdownRef}>
            <div className="dropdown-menu__list">
                <div onClick={onProfileClick}>{t('user-profile-link')}</div>
                <div onClick={onExitClick}>{t('exit-btn')}</div>
            </div>
        </div>
    );
};

export default WithTranslation(DropdownMenu);
