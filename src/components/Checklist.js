import "../css/Checklist.css";
import React from 'react';

function DevideLine() {
    return(
        <div className="devideline w-4/5 m-auto border border-[#A9D6C3]"/>
     );
}

function CheckList() {
    return(
        <div className="">
            <div className="inline-flex items-center ">
                <label className="relative flex items-center py-8 px-10 rounded-full cursor-pointer" htmlFor="customStyle">
                    <input type="checkbox"
                    className="before:content[''] peer relative h-8 w-8 cursor-pointer appearance-none rounded-full border-2 border-[#C3E0D1] bg-white transition-all checked:border-[#C3E0D1] checked:bg-[#C3E0D1] hover:scale-105"
                    //checked={true}
                    />
                    <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
                        stroke="currentColor" strokeWidth="1">
                            <path fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd">
                            </path>
                        </svg>
                    </span>
                </label>
                <span className="mt-px cursor-pointer select-none text-[#589B7F]">
                    자전거 타기
                </span>
            </div>
        </div>
    );
}

const Checklist = () => {
    return (
        <div className='w-full'>
            <div className='flex items-center justify-center'>
                <div className='bg-[#F4F9F6] w-full m-20 p-10 rounded-xl border-solid border-2 border-[#C3E0D1]'>
                    <div className='flex justify-between w-full'>
                        
                        <p className='text-xl text-[#498D80]'>1월 1주차</p>
                        <div className='flex'>
                        <p className='text-[#7BB49C] text-xl'>성공률</p>
                        <div className='w-72 rounded-xl bg-[#C3E0D1] m-1 mx-2'/>
                        <p className='text-[#7BB49C]'>72%</p>
                        </div>
                    </div>
                    <div className='flex justify-between mt-10'>
                        <div className='ml-10 bg-[#A9D6BE] w-1/2 mr-10 p-2 rounded-xl'>
                            <p className='p-2 text-xl text-white pt-4 pl-4'>성공목록</p>
                            <div className='Successlist w-full bg-white my-2 rounded-xl overflow-y-auto h-64'>
                                <CheckList/>
                                <DevideLine/>
                                <CheckList/>
                                <DevideLine/>
                                <CheckList/>
                            </div>
                        </div>
                        <div className='mr-10 bg-[#A9D6BE] w-1/2 ml-10 p-2 rounded-xl'>
                            <p className='p-2 text-xl text-white pt-4 pl-4'>실패목록</p>
                            <div className='faillist w-full bg-white my-2 rounded-xl overflow-y-auto h-64'>
                                <CheckList/>
                                <DevideLine/>
                                <CheckList/>
                                <DevideLine/>
                                <CheckList/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checklist;