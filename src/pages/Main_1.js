import react from 'react';
import Header from '../components/Header/Header_1';
import Sidebar from '../components/Sidebar/Sidebar_1';
import Mainpage from '../components/Mainpage/Mainpage';

function Main1() {
    return (
        <div>
            <Header/>     
            <div className='flex'>
                <Sidebar/>       
                <Mainpage/>
            </div>
        </div>
    );
}

export default Main1;