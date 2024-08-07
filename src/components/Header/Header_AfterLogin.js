import React, { useState, useEffect } from 'react';
import { API, getUserId } from '../../api/API';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 번호
    const [prevPageData, setPrevPageData] = useState([]); // 이전 페이지의 데이터
    const pageSize = 3; // 한 페이지에 보여질 항목 수
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const [sidebarData, setSidebarData] = useState([]);
    const navigate = useNavigate();
    const [username, setUsername] = useState('');

    const getWeekNumber = (date) => {
        const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        const firstDayOfWeek = firstDayOfMonth.getDay();
        const startOfWeek = firstDayOfMonth.getDate() - firstDayOfWeek + (firstDayOfWeek === 0 ? 0 : 7);
        const pastDaysOfMonth = (date.getDate() - startOfWeek) / 7;
        return Math.ceil(pastDaysOfMonth) + 1;
    };

    const currentWeek = getWeekNumber(currentDate);

    useEffect(() => {
        const checkToken = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const apiInstance = API();
                    const userId = getUserId();
                    const sidebarResponse = await apiInstance.post(`/guide/sidebar/${userId}`, {
                        month: 5,
                        week: currentWeek
                    });
                    const weekLists = [
                        { guideNM: sidebarResponse.data.WeekListNM1, isComplete: sidebarResponse.data.IsWeekList1, id: sidebarResponse.data.WeekListID1 },
                        { guideNM: sidebarResponse.data.WeekListNM2, isComplete: sidebarResponse.data.IsWeekList2, id: sidebarResponse.data.WeekListID2 },
                        { guideNM: sidebarResponse.data.WeekListNM3, isComplete: sidebarResponse.data.IsWeekList3, id: sidebarResponse.data.WeekListID3 },
                        { guideNM: sidebarResponse.data.WeekListNM4, isComplete: sidebarResponse.data.IsWeekList4, id: sidebarResponse.data.WeekListID4 },
                        { guideNM: sidebarResponse.data.WeekListNM5, isComplete: sidebarResponse.data.IsWeekList5, id: sidebarResponse.data.WeekListID5 },
                    ].filter(item => item.guideNM); // Filter out any undefined or null values

                    console.log(sidebarResponse.data.username)
                    console.log(sidebarResponse.data)
                    setSidebarData(weekLists);
                    if (!sidebarResponse.data.username || sidebarResponse.data.username.trim() === '') {
                        setUsername(sidebarResponse.data.user);
                    } else {
                        setUsername(sidebarResponse.data.username);
                    }
                    console.log(username)
                } catch (error) {
                    console.error('API 호출 중 에러 발생:', error);
                }
            }
        };

        checkToken();
    }, [currentMonth, currentWeek]); // Ensure useEffect re-runs when currentMonth, currentWeek, or sidebarData changes

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const showMoreItems = () => {
        setPrevPageData(sidebarData.slice(currentPage * pageSize, (currentPage + 1) * pageSize));
        setCurrentPage(currentPage + 1);
    };

    const showLessItems = () => {
        setCurrentPage(currentPage - 1);
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); // 로컬 스토리지에서 토큰 제거
        navigate('/'); // 로그인 페이지로 리디렉션
        window.location.reload(); // 페이지 새로고침
    };

    {/*모바일 크기 화면이었다가 데스크톱 화면 크기로 넘어갈 때, 메뉴바가 생성된 채로 커짐. 
    따라서 화면크기가 768 이상 되면 강제로 setIsDropdownOpen(false)*/}
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsDropdownOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="nav bg-white flex h-14 w-full drop-shadow-md fixed top-0 left-0 z-50">
            <Link to="/"><a className="block my-auto">
                <img className="logo w-full max-w-40 h-full max-h-14 my-auto ml-4" alt="ecostory_logo" src="img/ecostory_logo.png" />
            </a></Link>
            <div className="nav_contents flex flex-1 justify-end pr-4 my-auto">
                {/* 모바일 화면에서는 드롭다운 버튼 추가 */}
                <button className={`block md:hidden ml-4 ${isDropdownOpen ? 'text-[#498D80]' : 'text-[#498D80]'}`} onClick={toggleDropdown}>
                    {isDropdownOpen ? (
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <rect x="2" y="4" width="15" height="2" />
                            <rect x="2" y="9" width="15" height="2" />
                            <rect x="2" y="14" width="15" height="2" />
                        </svg>
                    )}
                </button>

                {/* 드롭다운 메뉴 */}
                {isDropdownOpen && (
                    <div>
                        <div className="absolute w-full h-screen top-0 left-0 mt-14 bg-white drop-shadow-md text-[#498D80]">
                            <div className='w-5/6 mx-auto h-full'>

                                <div className='info flex my-5 ml-2'>
                                    <div className='profile_img h-[80px] w-[80px] mr-3.5 rounded-full border-[3px] border-[#A9D6BE]'></div>

                                    <div className='flex'>
                                        <div className='nickname my-auto mr-2'>{username}</div>
                                    </div>
                                </div>

                                <div className='bg-[#EEF9F3] w-full min-h-1/4 rounded-xl drop-shadow-lg mb-16'>
                                    <div className='flex flex-col px-6 py-4 h-full'>
                                        {sidebarData.length === 0 ? (
                                            <div className='pr-2 text-center'>
                                                <p className='mb-3 text-[#8fbaa8] mt-3'>체크리스트를 등록하면 <br />할 수 있어에코</p>
                                                <Link to="/guide"><button className='p-3 px-5 bg-[#8fbaa8] text-[#EDF8F3] rounded-lg'>가이드북 설정하러 가기</button></Link>
                                            </div>
                                        ) : (
                                            sidebarData && sidebarData.slice(currentPage * pageSize, (currentPage + 1) * pageSize).map((item, index) => (
                                                <div key={index} className="flex top-0 h-full w-full drop-shadow-none">
                                                    <div className='my-auto drop-shadow-none'>
                                                        <label className="relative flex items-center mr-2 rounded-full cursor-pointer" htmlFor="customStyle">
                                                            <input
                                                                type="checkbox"
                                                                //checked={true}
                                                                className="before:content[''] peer relative h-6 w-6 cursor-pointer appearance-none rounded-full border-2 border-[#C3E0D1] bg-white transition-all checked:border-[#C3E0D1] checked:bg-[#DDEEE5] hover:scale-105"
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
                                                    <div className='my-auto text-sm py-2'>
                                                        {item.guideNM}
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                        <div className='text-center flex flex-1 justify-center'>
                                            {sidebarData.length < (currentPage + 1) * pageSize && sidebarData.length != 0 && (
                                                <button className="text-xl mr-6" onClick={showLessItems}> &lt; </button>
                                            )}
                                            {sidebarData.length > (currentPage + 1) * pageSize && (
                                                <button className="text-xl" onClick={showMoreItems}> &gt; </button>
                                            )}
                                        </div>
                                    </div>

                                </div>

                                <div className='flex flex-col justify-center items-center'>
                                    <Link to="/plan" className="text-[#498D80] mb-5">체크리스트 만들기</Link>
                                    <Link to="/checkliststate" className="text-[#498D80] mb-5">체크리스트 현황</Link>
                                    <Link to="/guide" className="text-[#498D80] mb-10">가이드북</Link>
                                    <div className='w-1/2 h-1 mx-auto bg-[#C3E0D1] mb-5' />
                                    <button className="text-[#498D80]" onClick={handleLogout}>로그아웃</button>
                                </div>

                            </div>
                        </div>
                    </div>
                )}

                {/* 데스크톱 화면에서는 바로 로그인과 회원가입 표시 */}
                <ul className="hidden md:flex list-none pr-12 my-auto">
                    <li className="ml-10">
                        <button className="text-[#498D80]" onClick={handleLogout}>로그아웃</button>
                    </li>
                    <li className="ml-10">
                        <Link to="/plan" className="text-[#498D80]">체크리스트 만들기</Link>
                    </li>
                    <li className="ml-10">
                        <Link to="/checkliststate" className="text-[#498D80]">체크리스트 현황</Link>
                    </li>
                    <li className="ml-10">
                        <Link to="/guide" className="text-[#498D80]">가이드북</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Header;
