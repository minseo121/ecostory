import React from 'react';
import { planData } from './data/PlanData';

// Checkbox 컴포넌트 정의
function Checkbox({ disabled }) {
    const handleClick = () => {
        if (disabled) {
            return; // 클릭 이벤트를 무시하도록 합니다.
        }
    };

    return (
        <label className={`relative flex items-center rounded-full cursor-pointer ${disabled ? 'pointer-events-none' : ''}`} htmlFor="customStyle">
            <input
                type="checkbox"
                className="before:content[''] peer relative h-6 w-6 cursor-pointer appearance-none rounded-full border-2 border-[#C3E0D1] bg-white transition-all checked:border-[#C3E0D1] checked:bg-[#C3E0D1] hover:scale-105"
                disabled={disabled} // 버튼 비활성화 여부를 설정합니다.
                onClick={handleClick} // 클릭 이벤트를 처리하는 함수를 설정합니다.
            />
            <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
            </span>
        </label>
    );
}

// PlanList 컴포넌트 정의
function PlanList({ weekData }) {
    return (
        <div className='w-full relative'>
            <div className={`p-5 border-[3px] border-[#A9D6C3] rounded-2xl shadow-md`}>
                <p className='pb-5'>{weekData.title}주차</p>
                <ul className='px-4 pb-5'>
                    {weekData.results.map((goal, index) => (
                        <li className='mt-3 flex justify-between' key={index}>
                            <p className=''>{goal.guideNM}</p>
                            <Checkbox disabled={weekData.isPastWeek} />
                        </li>
                    ))}
                </ul>
            </div>
            {weekData.isPastWeek && (
                <div className="absolute inset-0 bg-black opacity-30 rounded-2xl pointer-events-none"></div>
            )}
        </div>
    );
}

// 주어진 날짜의 주차를 계산하는 함수
const getWeekNumber = (date) => {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const firstDayOfWeek = firstDayOfMonth.getDay();
    const startOfWeek = firstDayOfMonth.getDate() - firstDayOfWeek + (firstDayOfWeek === 0 ? 0 : 7);
    const pastDaysOfMonth = date.getDate() - startOfWeek;
    return Math.ceil(pastDaysOfMonth / 7) + 1;
};

// 현재 주차 데이터를 반환하는 함수
const getCurrentWeekData = () => {
    const currentDate = new Date();
    const currentWeek = getWeekNumber(currentDate);

    return Object.entries(planData).map(([week, data]) => ({
        title: week,
        results: data,
        isPastWeek: parseInt(week) < currentWeek // 현재 주차보다 작으면 isPastWeek를 true로 설정
    }));
};

// Plan 컴포넌트 정의
const Plan = () => {
    const allWeekData = getCurrentWeekData(); // 모든 주차의 데이터를 받아옵니다.
/*     console.log("All week data:", allWeekData); */

    return (
        <div className='flex-1 mt-24 sm:ml-64 sm:m-16 text-[#498D80] w-screen sm:mt-24 mb-16'>
            <div>
                <p className='text-2xl'>이번 달 <span className='text-[#61D2A2]'>실천 계획</span></p>
                <p className='my-2'>삭제하고 싶은 목록을 체크 후 저장 시, 해당 목록이 삭제된 후 적용됩니다</p>
            </div>
            <div className='grid grid-cols-1 m-2 mt-8 gap-10 md:grid-cols-3'>
                {allWeekData.map((weekData, index) => (
                    <PlanList key={index} weekData={weekData} />
                ))}
            </div>
        </div>
    );
};

export default Plan;
