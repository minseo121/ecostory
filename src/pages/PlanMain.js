import React, { useState, useEffect } from 'react';
import Header from '../components/Header/Header_AfterLogin';
import Sidebar from '../components/Sidebar/Sidebar_AfterLogin';
import Plan from '../components/Plan';
import PlanBtn from '../components/PlanBtn';

const PlanMain = () => {
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
        <div className='relative'>
            <Header/>     
            <div className='flex'>
                {!isMobile && <Sidebar/>}
                <Plan/>
            </div>
            <PlanBtn/>
        </div>
    );
};

export default PlanMain;
