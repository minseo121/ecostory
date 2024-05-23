import React, { useState, useEffect } from 'react';
import Kmap from "../Kmap"
import '../../css/Main.css'

function Mainpage() {
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 640);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 640);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <div className="mainpage flex-1 bg-white mt-12 sm:pl-[220px] sm:mx-[2%] max-[640px]:rounded-t-xl max-[640px]:z-10 max-[640]:shadow-3xl">
            <div className='pt-9 h-screen max-[640px]:mx-3 max-[640px]:mb-16'>
                <div className="title w-full text-center sm:flex mb-[20px]">
                    <div className="title_content1 text-[#498D80] text-center sm:text-start text-[24px] sm:float-left my-auto sm:mr-[20%]">
                        우리 <span className="highlight text-[#61D2A2]">자연 환경 지수</span> 구경
                    </div>
                    {isSmallScreen && <br/>}
                    <div className="title_content2 bg-[#E2F8F6] h-12 rounded-xl sm:flex flex-1 flex items-center max-[640px]:mx-3">
                        <span className="text-[#498D80] flex items-center text-start text-sm sm:text-md my-auto ml-[3%]">오염도 기준 :</span>
                    </div>
                </div>
                <Kmap/>
            </div>
        </div>
    );
}

export default Mainpage;