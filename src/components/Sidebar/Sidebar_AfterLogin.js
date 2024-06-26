import React from 'react';
import { planSaveData } from '../data/PlanSaveData';
import { Link } from 'react-router-dom';

function DevideLine() {
    return (
        <div className="devideline w-4/5 m-auto border border-[#A9D6C3]" />
    );
}

function Checkbox() {
    return (
        <div className="mx-auto py-[2%] text-center">
            <div className="inline-flex items-center">
                <label className="relative flex items-center py-2 mr-2 rounded-full cursor-pointer" htmlFor="customStyle">
                    <input type="checkbox"
                        className="before:content[''] peer relative h-6 w-6 cursor-pointer appearance-none rounded-full border-2 border-[#C3E0D1] bg-white transition-all checked:border-[#C3E0D1] checked:bg-[#C3E0D1] hover:scale-105"
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
            </div>
        </div>
    );
}

function Sidebar() {
    const currentWeekData = getCurrentWeekData();
    console.log(currentWeekData);
    if (currentWeekData.length == 0) {
        // 현재 주의 데이터가 없는 경우에 대한 처리
       console.log("데이터없음");
    }

    return (
        <div>
            <div className='hidden sm:block'>
                <div className="sidebar_row bg-[#D3E7DD] w-[220px] h-screen pt-14 fixed z-20">
                    <div className='h-[5%]' />

                    <div className="profile_frame bg-[#EDF8F3] h-1/4 w-5/6 drop-shadow-md rounded-3xl relative flex mx-auto">
                        <div className="profile_content flex-1">
                            <div className="profile_img bg-white h-2/3 w-2/3 rounded-full mx-auto mt-2"></div>
                            <div className="profile_info flex justify-center mt-[5%]">
                                <div className="nickname text-[#589B7F] text-lg mr-1.5">신민서</div>
                                <div className="tier max-h-6 max-w-6">
                                    <img alt="tier" src="img/icon.png" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='h-[5%]' />

                    <div className="thisweek text-[#589B7F] text-lg ml-[15%]">이번 주</div>
                    <div className="checklist bg-[#EDF8F3] h-[55%] w-5/6 drop-shadow-md rounded-3xl mx-auto flex justify-center items-center">
                        <div className="list_container text-[#589B7F] flex-1 text-sm px-1 pl-4">
                        {currentWeekData.length === 0 ? (
                            <div className='pr-2 text-center'>
                                <p className='mb-5 text-[#8fbaa8]'>체크리스트를 등록하면 <br/>할 수 있어에코</p>
                                <Link to="/guide"><button className='p-3 px-5 bg-[#8fbaa8] text-[#EDF8F3] rounded-lg'>가이드북 설정하러 가기</button></Link>
                            </div>
                        ) : (
                            currentWeekData.map((item, index) => (
                                <div key={index}>
                                    <li className='mt-3 flex justify-between items-center pb-2'>
                                        <p className='mr-1'>{item.guideNM}</p>
                                        <Checkbox />
                                    </li>
                                    <DevideLine />
                                </div>
                            ))
                        )}
                        </div>
                    </div>
                </div>
            </div>

            <div className='sm:hidden'>
                <div className="sidebar_col bg-[#EDF8F3] h-[130px] relative top-14 text-[#589B7F]">
                    <div className='info h-full w-[85%] mx-auto flex items-center'>
                        <div className='profile_img h-[95px] w-[95px] mr-3.5 rounded-full border-[3.5px] border-[#A9D6BE]'></div>

                        <div className='flex-1'>
                            <div className='flex mb-1'>
                                <div className='nickname my-auto mr-2'>신민서</div>
                                <div className='tier max-h-6 max-w-6 my-auto'>
                                    <img alt='tier' src='img/icon.png' />
                                </div>
                            </div>
                            <div className='flex flex-col text-[10px] text-[#7BB49C]'>
                                <p>이번주 성공률</p>
                                <div className='flex items-center'>
                                    <div className='w-full h-2 rounded-xl bg-[#C3E0D1]'></div>
                                    <div className='ml-2'>72%</div>
                                </div>                                                               
                                <Link to="/checkliststate">
                                    <div className="flex justify-end text-white mt-1 h-6">
                                        <button className="login_btn bg-[#98C4B1] rounded-lg px-5">이번주 목표 확인하기</button>
                                    </div>
                                </Link>
                                
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

const getWeekNumber = (date) => {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const firstDayOfWeek = firstDayOfMonth.getDay();
    const startOfWeek = firstDayOfMonth.getDate() - firstDayOfWeek + (firstDayOfWeek === 0 ? 0 : 7);
    const pastDaysOfMonth = (date.getDate() - startOfWeek) / 7;
    return Math.ceil(pastDaysOfMonth) + 1;
};

export const getCurrentWeekData = () => {
    const currentDate = new Date();
    const currentWeek = getWeekNumber(currentDate);

    // 현재 주차의 데이터를 찾습니다.
    const currentWeekData = planSaveData.list.find((weekData) => {
        const weekNumber = parseInt(Object.keys(weekData)[0]);
        return weekNumber === currentWeek;
    });

    if (currentWeekData) {
        return currentWeekData[Object.keys(currentWeekData)[0]];
    } else {
        return null;
    }
};

export default Sidebar;
