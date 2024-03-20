import React from 'react';
import Header from '../components/Header/Header_AfterLogin';
import Sidebar from '../components/Sidebar/Sidebar_AfterLogin';
import Plan from '../components/Plan';

const PlanMain = () => {
    return (
        <div>
            <Header/>     
            <div className='flex'>
                <Sidebar/>       
                <Plan/>
            </div>
        </div>
    );
};

export default PlanMain;