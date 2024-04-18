import "../css/Checklist.css";
import React from 'react';

function DevideLine({ color = "#A9D6C3" }) {
    return(
        <div className={`devideline w-4/5 m-auto border border-${color}`} />
     );
}

function SuccessList() {
    return(
        <div className="">
            <div className="inline-flex items-center ">
                <label className="relative flex items-center py-5 px-10 rounded-full cursor-pointer" htmlFor="customStyle">
                <div className="p-2 rounded-full bg-[#C3E0D1]">
                <svg width="19" height="15" viewBox="0 0 19 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="2.29435" height="10.5999" rx="1.14718" transform="matrix(0.625533 -0.780197 0.664631 0.747171 0.404114 5.29053)" fill="white"/>
                    <rect width="2.43568" height="14.5541" rx="1.21784" transform="matrix(0.626459 0.779454 -0.668529 0.743686 15.8871 0.202301)" fill="white"/>
                    </svg>
                    </div>
                </label>
                <span className="mt-px cursor-pointer select-none text-[#589B7F]">
                    자전거 타기
                </span>
            </div>
            <DevideLine/>
        </div>
    );
}
function FailList() {
    return(
        <div className="">
            <div className="inline-flex items-center ">
                <label className="relative flex items-center py-5 px-10 rounded-full cursor-pointer" htmlFor="customStyle">
                    <div className="p-2 rounded-full bg-[#8E8E8E]">
                    <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="2.40085" height="16.8834" rx="1.20042" transform="matrix(0.61212 0.790765 -0.654556 0.756014 11.9485 0)" fill="white"/>
                        <rect width="2.3775" height="17.0257" rx="1.18875" transform="matrix(-0.796885 0.604132 -0.698623 -0.71549 13.7891 12.7921)" fill="white"/>
                        </svg>
                    </div>
                </label>
                <span className="mt-px cursor-pointer select-none text-[#8E8E8E]">
                    자전거 타기
                </span>
            </div>
            <DevideLine color="#D9D9D9"/>
        </div>
    );
}

const Checklist = () => {
    return (
        <div className='w-full'>
            <div className='flex items-center justify-center'>
                <div className='bg-[#F4F9F6] w-full sm:ml-56 sm:mt-24 mx-3 mb-5 mt-20 p-5 sm:p-10 rounded-xl border-solid border-2 border-[#C3E0D1]'>
                    <div className='sm:flex sm:justify-between w-full'>
                        <p className='text-xl text-[#498D80]'>1월 1주차</p>
                        <div className='flex max-[640px]:w-full max-[640px]:justify-center max-[640px]:mt-3'>
                            <p className='text-[#7BB49C] sm:text-lg'>성공률</p>
                            <div className='w-2/3 sm:w-72 rounded-xl bg-[#C3E0D1] m-1 mx-2'/>
                            <p className='text-[#7BB49C]'>72%</p>
                        </div>
                    </div>
                    <div className='sm:flex sm:justify-between sm:mt-10 mt-5'>
                        <div className=' bg-[#A9D6BE] sm:w-1/2 sm:mr-5 p-2 rounded-xl max-[640px]:mb-5'>
                            <p className='p-2 text-lg text-white pt-4 pl-4'>성공목록</p>
                            <div className='Successlist w-full bg-white my-2 rounded-xl overflow-y-auto h-48'>
                                <SuccessList/>
                                <SuccessList/>
                                <SuccessList/>
                            </div>
                        </div>
                        <div className=' bg-[#ADADAD] sm:w-1/2 sm:ml-5 p-2 rounded-xl'>
                            <p className='p-2 text-lg text-white pt-4 pl-4'>실패목록</p>
                            <div className='faillist w-full bg-white my-2 rounded-xl overflow-y-auto h-48'>
                                    <FailList/>
                                    <FailList/>
                                    <FailList/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checklist;