import react from 'react';
import Header from '../components/Header/Header_2';
import Sidebar from '../components/Sidebar/Sidebar_2';
import Mainpage from '../components/Mainpage/Mainpage';

function Main() {
    return (
        <div className='main'>
            <Header/>     
            <div className='flex'>
                <Sidebar/>       
                <Mainpage/>
            </div>
        </div>
    );
}

export default Main;