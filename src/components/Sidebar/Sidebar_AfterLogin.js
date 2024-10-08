import React, { useState, useEffect } from 'react';
import { API, getUserId } from '../../api/API';
import { Link } from 'react-router-dom';

function DevideLine() {
    return (
        <div className="devideline w-4/5 m-auto border border-[#A9D6C3]" />
    );
}

function Checkbox({ checked, onChange }) {
    return (
        <div className="mx-auto py-[2%] text-center">
            <div className="inline-flex items-center">
                <label className="relative flex items-center py-2 mr-2 rounded-full cursor-pointer" htmlFor="customStyle">
                    <input type="checkbox"
                        className="before:content[''] peer relative h-6 w-6 cursor-pointer appearance-none rounded-full border-2 border-[#C3E0D1] bg-white transition-all checked:border-[#C3E0D1] checked:bg-[#C3E0D1] hover:scale-105"
                        checked={checked}
                        onChange={onChange}
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

const getWeekNumber = (date) => {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const firstDayOfWeek = firstDayOfMonth.getDay();
    const startOfWeek = firstDayOfMonth.getDate() - firstDayOfWeek + (firstDayOfWeek === 0 ? 0 : 7);
    const pastDaysOfMonth = (date.getDate() - startOfWeek) / 7;
    return Math.ceil(pastDaysOfMonth) + 1;
};

function Sidebar() {
    const currentDate = new Date();
    const currentWeek = getWeekNumber(currentDate);
    const currentMonth = currentDate.getMonth() + 1;
    const userId = getUserId();
    const [sidebarData, setSidebarData] = useState([]);
    const [username, setUsername] = useState('');
    const [userimg, setUserimg] = useState('');
    const [weekData, setWeekData] = useState([]);
    console.log(currentWeek);

    //성공률 가져오는 API
    useEffect(() => {

        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const apiInstance = API();
                    const userId = getUserId();
                    const response = await apiInstance.post(`/checklist/show/${userId}`, {
                        month: currentMonth,
                        WeekNumber: currentWeek
                    });
                    const currentWeekData = response.data.filter(item => item.WeekNumber === currentWeek);
                    setWeekData(currentWeekData);
                    console.log('이거임', weekData);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
        }

        fetchData();
    }, [userId, currentWeek]);


    //사이드바 API
    useEffect(() => {
        const checkToken = async () => { //sidebar 내용 받아오기
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const apiInstance = API();
                    const userId = getUserId();
                    const sidebarResponse = await apiInstance.post(`/guide/sidebar/${userId}`, {
                        month: currentMonth,
                        week: currentWeek
                    });
                    const weekLists = [
                        { guideNM: sidebarResponse.data.WeekListNM1, isComplete: sidebarResponse.data.IsWeekList1, id: sidebarResponse.data.WeekListID1 },
                        { guideNM: sidebarResponse.data.WeekListNM2, isComplete: sidebarResponse.data.IsWeekList2, id: sidebarResponse.data.WeekListID2 },
                        { guideNM: sidebarResponse.data.WeekListNM3, isComplete: sidebarResponse.data.IsWeekList3, id: sidebarResponse.data.WeekListID3 },
                        { guideNM: sidebarResponse.data.WeekListNM4, isComplete: sidebarResponse.data.IsWeekList4, id: sidebarResponse.data.WeekListID4 },
                        { guideNM: sidebarResponse.data.WeekListNM5, isComplete: sidebarResponse.data.IsWeekList5, id: sidebarResponse.data.WeekListID5 },
                    ].filter(item => item.guideNM);

                    setSidebarData(weekLists);
                    if (!sidebarResponse.data.username || sidebarResponse.data.username.trim() === '') {
                        setUsername(sidebarResponse.data.user);
                    } else {
                        setUsername(sidebarResponse.data.username);
                    }
                    if (!sidebarResponse.data.image || sidebarResponse.data.image.trim() === '') {
                        setUserimg(sidebarResponse.data.userImage);
                    } else {
                        setUserimg(sidebarResponse.data.image);
                    }
                } catch (error) {
                    console.error('API 호출 중 에러 발생:', error);
                }
            }
        };

        checkToken();
    }, [currentMonth, currentWeek]);

    const handleCheckboxChange = async (index) => { //체크하면 넘어가서 저장되는 API
        const token = localStorage.getItem('token');
        if (token) {
            const updatedSidebarData = sidebarData.map((item, i) => {
                if (i === index) {
                    return { ...item, isComplete: item.isComplete === 1 ? 0 : 1 };
                }
                return item;
            });

            setSidebarData(updatedSidebarData);
            console.log(updatedSidebarData);

            const apiInstance = API();
            const userId = getUserId();
            try {
                const requestPayload = {
                    month: currentMonth,
                    week: currentWeek,
                    IsWeekList1: updatedSidebarData[0]?.isComplete || 0,
                    IsWeekList2: updatedSidebarData[1]?.isComplete || 0,
                    IsWeekList3: updatedSidebarData[2]?.isComplete || 0,
                    IsWeekList4: updatedSidebarData[3]?.isComplete || 0,
                    IsWeekList5: updatedSidebarData[4]?.isComplete || 0
                };
                console.log('넣은 값', requestPayload);

                const response = await apiInstance.put(`/guide/savesidebar/${userId}`, requestPayload);

                console.log('API 대답', response.data);
            } catch (error) {
                console.error('체크리스트 상태 저장 중 에러 발생:', error);
            }
        }
    };

    return (
        <div>
            <div className='hidden sm:block'>
                <div className="sidebar_row bg-[#D3E7DD] w-[220px] h-full pt-14 fixed z-20">
                    <div className='h-[5%]' />
                    <Link to="/profile">
                        <div className="profile_frame bg-[#EDF8F3] aspect-square w-5/6 drop-shadow-md rounded-3xl relative flex mx-auto">
                            <div className="profile_content flex-1">
                                {userimg == null ? (
                                    <div className="profile_img bg-white h-2/3 w-2/3 rounded-full mx-auto mt-2 overflow-hidden">
                                        <svg
                                            className="object-cover w-full h-full cursor-pointer"
                                            fill="#A9D6BE"
                                            width="800px"
                                            height="800px"
                                            viewBox="0 0 32 32"
                                            version="1.1"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <title>user</title>
                                            <path d="M16 16.75c4.28 0 7.75-3.47 7.75-7.75s-3.47-7.75-7.75-7.75c-4.28 0-7.75 3.47-7.75 7.75v0c0.005 4.278 3.472 7.745 7.75 7.75h0zM16 2.75c3.452 0 6.25 2.798 6.25 6.25s-2.798 6.25-6.25 6.25c-3.452 0-6.25-2.798-6.25-6.25v0c0.004-3.45 2.8-6.246 6.25-6.25h0zM30.41 29.84c-1.503-6.677-7.383-11.59-14.41-11.59s-12.907 4.913-14.391 11.491l-0.019 0.099c-0.011 0.048-0.017 0.103-0.017 0.16 0 0.414 0.336 0.75 0.75 0.75 0.357 0 0.656-0.25 0.731-0.585l0.001-0.005c1.351-5.998 6.633-10.41 12.945-10.41s11.594 4.413 12.929 10.322l0.017 0.089c0.076 0.34 0.374 0.59 0.732 0.59 0 0 0.001 0 0.001 0h-0c0.057-0 0.112-0.007 0.165-0.019l-0.005 0.001c0.34-0.076 0.59-0.375 0.59-0.733 0-0.057-0.006-0.112-0.018-0.165l0.001 0.005z"></path>
                                        </svg>
                                    </div>
                                ) : (
                                    <div className='profile_img bg-white h-2/3 w-2/3 rounded-full mx-auto mt-2 overflow-hidden'>
                                        <img
                                            src={userimg}
                                            className="object-cover w-full h-full cursor-pointer"
                                            alt="User"
                                        />
                                    </div>
                                )}
                                <div className="profile_info flex justify-center mt-[5%]">
                                    <div className="nickname text-[#589B7F] text-lg mr-1.5">{username}</div>
                                </div>
                            </div>
                        </div>
                    </Link>

                    <div className='h-[5%]' />

                    <div className="thisweek text-[#589B7F] text-lg ml-[15%]">이번 주</div>
                    <div className="checklist bg-[#EDF8F3] min-h-[55%] w-5/6 drop-shadow-md rounded-3xl mx-auto flex justify-center items-center">
                        <div className="list_container text-[#589B7F] flex-1 text-sm px-1 pl-4">
                            {Array.isArray(sidebarData) && sidebarData.length === 0 ? (
                                <div className='pr-2 text-center'>
                                    <p className='mb-5 text-[#8fbaa8]'>체크리스트를 등록하면 <br />할 수 있어에코</p>
                                    <Link to="/guide"><button className='p-3 px-5 bg-[#8fbaa8] text-[#EDF8F3] rounded-lg'>가이드북 설정하러 가기</button></Link>
                                </div>
                            ) : (
                                Array.isArray(sidebarData) && sidebarData.map((item, index) => (
                                    <div key={index}>
                                        <li className='mt-3 flex justify-between items-center pb-2'>
                                            <p className='mr-1'>{item.guideNM}</p>
                                            <div className='ml-3'>
                                                <Checkbox checked={item.isComplete === 1} onChange={() => handleCheckboxChange(index)} />
                                            </div>
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
                        <Link to="/profile">
                            {userimg == null ? (
                                <div className='profile_img h-[95px] w-[95px] mr-3.5 rounded-full border-[3.5px] border-[#A9D6BE] overflow-hidden'>
                                    <svg
                                        className="object-cover w-full h-full cursor-pointer"
                                        fill="#A9D6BE"
                                        width="800px"
                                        height="800px"
                                        viewBox="0 0 32 32"
                                        version="1.1"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <title>user</title>
                                        <path d="M16 16.75c4.28 0 7.75-3.47 7.75-7.75s-3.47-7.75-7.75-7.75c-4.28 0-7.75 3.47-7.75 7.75v0c0.005 4.278 3.472 7.745 7.75 7.75h0zM16 2.75c3.452 0 6.25 2.798 6.25 6.25s-2.798 6.25-6.25 6.25c-3.452 0-6.25-2.798-6.25-6.25v0c0.004-3.45 2.8-6.246 6.25-6.25h0zM30.41 29.84c-1.503-6.677-7.383-11.59-14.41-11.59s-12.907 4.913-14.391 11.491l-0.019 0.099c-0.011 0.048-0.017 0.103-0.017 0.16 0 0.414 0.336 0.75 0.75 0.75 0.357 0 0.656-0.25 0.731-0.585l0.001-0.005c1.351-5.998 6.633-10.41 12.945-10.41s11.594 4.413 12.929 10.322l0.017 0.089c0.076 0.34 0.374 0.59 0.732 0.59 0 0 0.001 0 0.001 0h-0c0.057-0 0.112-0.007 0.165-0.019l-0.005 0.001c0.34-0.076 0.59-0.375 0.59-0.733 0-0.057-0.006-0.112-0.018-0.165l0.001 0.005z"></path>
                                    </svg>
                                </div>
                            ) : (
                                <div className='profile_img h-[95px] w-[95px] mr-3.5 rounded-full border-[3.5px] border-[#A9D6BE] overflow-hidden'>
                                    <img
                                        src={userimg}
                                        className="object-cover w-full h-full cursor-pointer"
                                        alt="User"
                                    />
                                </div>
                            )}
                        </Link>
                        <div className='flex-1'>
                            <div className='flex mb-1'>
                                <Link to="/profile">
                                    <div className='nickname my-auto mr-2'>{username}</div>
                                </Link>
                            </div>
                            <div className='flex flex-col text-[10px] text-[#7BB49C]'>
                                <p>이번주 성공률</p>
                                <div className='flex items-center'>
                                    <div className='w-full h-2 rounded-xl bg-[#C3E0D1]'>
                                        <div className='bg-[#61D2A2] h-full rounded-xl' style={{ width: `${weekData[0]?.rate || 0}%` }}></div>
                                    </div>
                                    <div className='ml-2'>{weekData[0]?.rate || 0}%</div>
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

export default Sidebar;
