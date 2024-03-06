import React from 'react';
import Header from '../components/Header/Header_AfterLogin';
import Sidebar from '../components/Sidebar/Sidebar_AfterLogin';
import Checklist from '../components/Checklist';

const ChecklistState = () => {
    return (
        <div>
            <Header/>     
            <div className='flex'>
                <Sidebar/>       
                <Checklist/>
            </div>
        </div>
    );
};

export default ChecklistState;