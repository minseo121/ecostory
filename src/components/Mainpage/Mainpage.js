import react from 'react';
import './Mainpage.css';

function Mainpage() {
    return (
        <div className='bg-white basis-5/6 mt-8 mx-[3%]'>
            <div className='flex mb-[2%]'>
                <div className='text-[#498D80] text-3xl float-left my-auto mr-[20%]'>
                    우리 <span className='text-[#61D2A2]'>자연 환경 지수</span> 구경
                </div>
                <div className='bg-[#E2F8F6] h-12 rounded-xl flex flex-1 '>
                    <span className='text-[#498D80] my-auto ml-[3%]'>티어 기준 :</span>
                </div>
            </div>
            <div className='h-[85%] rounded-xl border-8  border-[#C9EFEC]'>
                
            </div>

        </div>
    );
}

export default Mainpage;