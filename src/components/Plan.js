import React, { useState, useEffect } from 'react';
import { API, getUserId } from '../api/API';
import { useNavigate } from 'react-router-dom';
import PlanBtn from './PlanBtn'; // PlanBtn 컴포넌트 import

// Checkbox 컴포넌트 정의
function Checkbox({ id, week, disabled, onCheck, checked }) {
  const handleChange = () => {
    if (disabled) {
      return; // 클릭 이벤트를 무시합니다.
    }
    onCheck(id, week);
  };

  return (
    <label
      className={`relative flex items-center rounded-full cursor-pointer ${disabled ? 'pointer-events-none' : ''}`}
      htmlFor={`checkbox-${id}`}
    >
      <input
        type="checkbox"
        id={`checkbox-${id}`}
        className="before:content[''] peer relative h-6 w-6 cursor-pointer appearance-none rounded-full border-2 border-[#C3E0D1] bg-white transition-all checked:border-[#C3E0D1] checked:bg-[#C3E0D1] hover:scale-105"
        disabled={disabled}
        checked={checked} // 체크 상태를 prop으로 받음
        onChange={handleChange} // 클릭 시 상태 업데이트
      />
      <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3.5 w-3.5"
          viewBox="0 0 20 20"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    </label>
  );
}


// PlanList 컴포넌트 정의
function PlanList({ weekData, onCheck, checkedItems }) {
  return (
    <div className="w-full relative h-full flex flex-col">
      <div className="flex-grow p-5 border-[3px] border-[#A9D6C3] rounded-2xl shadow-md">
        <p className="pb-5">{weekData.title}주차</p>
        <ul className="px-4 pb-5">
          {Array.isArray(weekData.results) && weekData.results.map((goal, index) => (
            <li className="mt-3 flex justify-between" key={index}>
              <p className="">{goal.guideNM}</p>
              <Checkbox
                id={goal.guideId}
                week={weekData.title}
                disabled={weekData.isPastWeek}
                onCheck={onCheck}
                checked={checkedItems.some(item => item.id === goal.guideId && item.week === weekData.title)} // 추가된 부분
              />
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

// Plan 컴포넌트 정의
const Plan = () => {
  const navigate = useNavigate();
  const [planData, setPlanData] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;

  // API 통신 코드
  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const apiInstance = API();
          const userId = getUserId();
          const checklistResponse = await apiInstance.post(`/guide/checklist/${userId}`, {
            month: currentMonth,
          });
          if (checklistResponse.data === '체크리스트가 비었습니다. 새로 만들어주세요') {
            alert('체크리스트가 비어있습니다. 가이드북 페이지로 이동합니다.');
            navigate('/guide');
            window.location.reload();
          } else if (checklistResponse.status === 200) {
            setPlanData(checklistResponse.data);
          }
        } catch (error) {
          console.error('API 호출 중 에러 발생:', error);
        }
      }
    };

    checkToken();
  }, []);

  const currentWeek = getWeekNumber(currentDate);

  const allWeekData = planData.flatMap(weekObject =>
    Object.entries(weekObject).map(([week, data]) => ({
      title: week,
      results: data,
      isPastWeek: parseInt(week) < currentWeek,
    }))
  );

  const handleCheck = (id, week) => {
    setCheckedItems(prevCheckedItems =>
      prevCheckedItems.some(item => item.id === id)
        ? prevCheckedItems.filter(item => item.id !== id)
        : [...prevCheckedItems, { id, week }]
    );
  };

  useEffect(() => {
    console.log('Updated checked items:', checkedItems);
  }, [checkedItems]);

  const handleRegister = async () => {
    console.log('사실 함수는 잘 가고있었죠?');
    const userId = getUserId();
    const deleteData = {
      month: currentMonth, //확인하려면 데이터가 들어있는 5월달로
      list: checkedItems.map(item => ({
        week: item.week,
        guide_Id: item.id,
      })),
    };
    console.log('deleteData', deleteData); // 삭제할 데이터 로그

    // 실제 삭제 요청 보내기
    try {
      const apiInstance = API();
      await apiInstance.delete(`/guide/delete/${userId}`, { data: deleteData });

      const checklistResponse = await apiInstance.post(`/guide/checklist/${userId}`, {
        month: currentMonth, //확인하려면 데이터가 들어있는 5월달로
      });

      if (checklistResponse.status === 200) {
        console.log('checklistResponse', checklistResponse.data); // 응답 데이터 로그
        setPlanData(checklistResponse.data);
        setCheckedItems([]); // 체크된 아이템 초기화
      }
    } catch (error) {
      console.error('등록 요청 중 에러 발생:', error);
    }
  };

  return (
    <div className="flex-1 mt-24 sm:ml-64 sm:m-16 text-[#498D80] w-screen sm:mt-24 mb-16 max-w-screen-xl mx-auto">
      <div>
        <p className="text-2xl">
          이번 달 <span className="text-[#61D2A2]">실천 계획</span>
        </p>
        <p className="my-2">삭제하고 싶은 목록을 체크 후 등록 시, 해당 목록이 삭제된 후 적용됩니다</p>
      </div>
      <div className="grid grid-cols-1 m-2 mt-8 gap-10 md:grid-cols-3 auto-rows-fr">
        {allWeekData.map((weekData, index) => (
          <PlanList
            key={index}
            weekData={weekData}
            onCheck={handleCheck}
            checkedItems={checkedItems} // 추가된 부분
          />
        ))}
        <PlanBtn onRegister={handleRegister} />
      </div>
    </div>
  );
};


export default Plan;
