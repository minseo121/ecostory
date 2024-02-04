import react from 'react';

function Mainpage() {
    return (
        <div className='bg-white basis-5/6 mt-8 mx-[45px]'>
            <div className='flex mb-[30px]'>
                <div className='text-[#498D80] text-3xl float-left my-auto mr-[300px]'>
                    우리 <span className='text-[#61D2A2]'>자연 환경 지수</span> 구경
                </div>
                <div className='bg-[#E2F8F6] h-12 rounded-xl flex flex-1 '>
                    <span className='text-[#498D80] my-auto ml-[3%]'>오염도 기준 :</span>
                </div>
            </div>
            <div className='h-[85%] rounded-xl border-8  border-[#C9EFEC]'>
                
            </div>

        </div>
    );
}

export default Mainpage;