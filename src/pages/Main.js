import react from 'react';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import Mainpage from '../components/Mainpage/Mainpage';

function Main() {
    return (
        <div className='main'>
            <Header></Header>     
            <Sidebar></Sidebar>       
            <Mainpage></Mainpage>
        </div>
    );
}

export default Main;