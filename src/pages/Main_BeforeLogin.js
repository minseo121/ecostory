import react from 'react';
import Header from '../components/Header/Header_BeforeLogin';
import Sidebar from '../components/Sidebar/Sidebar_BeforeLogin';
import Mainpage from '../components/Mainpage/Mainpage';

function Main() {
    return (
        <div>
            <Header/>     
<<<<<<< HEAD
            <div className='flex flex-col sm:flex-row'>
                <Sidebar/>       
=======
            <div className='flex flex-col md:flex-row'>
                <Sidebar/>   
>>>>>>> 3be87b83b32ae80753b4493e71ddb5b1cd4d3613
                <Mainpage/>
            </div>
        </div>
    );
}

export default Main;