import React, { useState, useEffect } from 'react';
import Header from '../components/Header/Header_AfterLogin';
import Sidebar from '../components/Sidebar/Sidebar_AfterLogin';
import Checklist from '../components/Checklist';

const ChecklistState = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 640);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <div>
            <Header/>     
            <div className='flex'>
                {!isMobile && <Sidebar/>}     
                <Checklist/>
            </div>
        </div>
    );
};

export default ChecklistState;