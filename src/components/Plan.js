import React from 'react';
import { planData } from './data/PlanData';

function Checkbox() {
 return(
    <label className="relative flex items-center rounded-full cursor-pointer" htmlFor="customStyle">
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
 );
}

function PlanList({ weekData }) {
    return (
        <div className='w-full'>
             <div className={`p-5 border-[3px] border-[#A9D6C3] rounded-2xl shadow-md ${weekData.isPastWeek ? 'bg-gray-200' : ''}`}>
                <p className='pb-5'>{weekData.title}</p>
                <ul className='px-4 pb-5'>
                    {weekData.results.map((goal, index) => (
                        <li className='mt-3 flex justify-between' key={index}>
                            <p className=''>{goal}</p>
                            <Checkbox />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
const getCurrentMonthData = () => {
    const currentMonth = new Date().getMonth() + 1; 

    return Object.entries(planData).filter(([key]) => {
        const month = key.split(' ')[0];
        return parseInt(month) === currentMonth;
    });
};
const getCurrentWeekData = () => {
    const currentWeek = new Date().getDate() + 1; 

    return Object.entries(planData).filter(([key]) => {
        const week = key.split(' ')[1];
        const isPastWeek = parseInt(week) < currentWeek;

        return {
            key,
            isPastWeek
        };
    });
};

const Plan = () => {
    const currentMonthData = getCurrentMonthData();
    const currentWeekData = getCurrentWeekData();
    return (
        <div className='flex-1 m-8 mt-24 sm:ml-56 sm:m-16 text-[#498D80] w-screen sm:mt-24'>
            <div>
                <p className='text-2xl'>이번 달 <span className='text-[#61D2A2]'>실천 계획</span></p>
                <p className='my-2'>삭제하고 싶은 목록을 체크 후 저장 시, 해당 목록이 삭제된 후 적용됩니다</p>
            </div>
            <div className='grid grid-cols-1 m-2 mt-8 gap-10 md:grid-cols-3'>
                {currentMonthData.map(([week, data], index) => (
                    <PlanList key={index} weekData={{ title: week, results: Object.values(data[0])}}/>
                ))}
            </div>
        </div>
    );
};

export default Plan;