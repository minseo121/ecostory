import react from 'react';
import Header from '../components/Header/Header_AfterLogin';
import Sidebar from '../components/Sidebar/Sidebar_AfterLogin';
import Mainpage from '../components/Mainpage/Mainpage';
import '../css/Main.css';

function Main() {
    return (
        <div>
            <Header/>     
            <div className='flex flex-col sm:flex-row'>
                <Sidebar/>       
                <Mainpage/>
            </div>
        </div>
    );
}

export default Main;