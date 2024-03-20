import react from 'react';
import Header from '../components/Header/Header_BeforeLogin';
import Sidebar from '../components/Sidebar/Sidebar_BeforeLogin';
import Mainpage from '../components/Mainpage/Mainpage';

function Main() {
    return (
        <div>
            <Header/>     
            <div className='flex flex-col md:flex-row'>
                <Sidebar/>       
                <Mainpage/>
            </div>
        </div>
    );
}

export default Main;