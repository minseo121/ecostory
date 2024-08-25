import React, { useState, useEffect } from "react";
import { API, getUserId } from "../../api/API";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 번호
  const [prevPageData, setPrevPageData] = useState([]); // 이전 페이지의 데이터
  const pageSize = 3; // 한 페이지에 보여질 항목 수
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const [sidebarData, setSidebarData] = useState([]);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [userimg, setUserimg] = useState('');

  const getWeekNumber = (date) => {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const firstDayOfWeek = firstDayOfMonth.getDay();
    const startOfWeek =
      firstDayOfMonth.getDate() -
      firstDayOfWeek +
      (firstDayOfWeek === 0 ? 0 : 7);
    const pastDaysOfMonth = (date.getDate() - startOfWeek) / 7;
    return Math.ceil(pastDaysOfMonth) + 1;
  };

  const currentWeek = getWeekNumber(currentDate);

  //사이드바 API
  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const apiInstance = API();
          const userId = getUserId();
          const sidebarResponse = await apiInstance.post(
            `/guide/sidebar/${userId}`,
            {
              month: currentMonth,
              week: currentWeek,
            }
          );
          const weekLists = [
            {
              guideNM: sidebarResponse.data.WeekListNM1,
              isComplete: sidebarResponse.data.IsWeekList1,
              id: sidebarResponse.data.WeekListID1,
            },
            {
              guideNM: sidebarResponse.data.WeekListNM2,
              isComplete: sidebarResponse.data.IsWeekList2,
              id: sidebarResponse.data.WeekListID2,
            },
            {
              guideNM: sidebarResponse.data.WeekListNM3,
              isComplete: sidebarResponse.data.IsWeekList3,
              id: sidebarResponse.data.WeekListID3,
            },
            {
              guideNM: sidebarResponse.data.WeekListNM4,
              isComplete: sidebarResponse.data.IsWeekList4,
              id: sidebarResponse.data.WeekListID4,
            },
            {
              guideNM: sidebarResponse.data.WeekListNM5,
              isComplete: sidebarResponse.data.IsWeekList5,
              id: sidebarResponse.data.WeekListID5,
            },
          ].filter((item) => item.guideNM);

          setSidebarData(weekLists);
          setUsername(
            sidebarResponse.data.username || sidebarResponse.data.user
          );
          setUserimg(
            sidebarResponse.data.image || sidebarResponse.data.userImage
          );
        } catch (error) {
          console.error("API 호출 중 에러 발생:", error);
        }
      }
    };

    checkToken();
  }, [currentMonth, currentWeek]);

  const handleCheckboxChange = async (index) => {
    const token = localStorage.getItem("token");
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
          IsWeekList5: updatedSidebarData[4]?.isComplete || 0,
        };
        console.log("Payload", requestPayload);

        const response = await apiInstance.put(
          `/guide/savesidebar/${userId}`,
          requestPayload
        );

        console.log("API Response", response.data);
      } catch (error) {
        console.error("Error saving checklist status:", error);
      }
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const showMoreItems = () => {
    setPrevPageData(
      sidebarData.slice(currentPage * pageSize, (currentPage + 1) * pageSize)
    );
    setCurrentPage(currentPage + 1);
  };

  const showLessItems = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // 로컬 스토리지에서 토큰 제거
    navigate("/"); // 로그인 페이지로 리디렉션
    window.location.reload(); // 페이지 새로고침
  };

  {
    /*모바일 크기 화면이었다가 데스크톱 화면 크기로 넘어갈 때, 메뉴바가 생성된 채로 커짐. 
    따라서 화면크기가 768 이상 되면 강제로 setIsDropdownOpen(false)*/
  }
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsDropdownOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="nav bg-white flex h-14 w-full drop-shadow-md fixed top-0 left-0 z-50">
      <Link to="/">
        <a className="block my-auto">
          <img
            className="logo w-full max-w-40 h-full max-h-14 my-auto ml-4"
            alt="ecostory_logo"
            src={`${process.env.PUBLIC_URL}/img/ecostory_logo.png`}
          />
        </a>
      </Link>
      <div className="nav_contents flex flex-1 justify-end pr-4 my-auto">
        {/* 모바일 화면에서는 드롭다운 버튼 추가 */}
        <button
          className={`block md:hidden ml-4 ${isDropdownOpen ? "text-[#498D80]" : "text-[#498D80]"}`}
          onClick={toggleDropdown}
        >
          {isDropdownOpen ? (
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
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
              <div className="w-5/6 mx-auto h-full">
                <div className="info flex my-5 ml-2">
                  <Link to="/profile">
                    {userimg == null ? (
                      <div className="profile_img h-[80px] w-[80px] mr-3.5 rounded-full border-[3px] border-[#A9D6BE] overflow-hidden">
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
                      <div className="profile_img h-[80px] w-[80px] mr-3.5 rounded-full border-[3px] border-[#A9D6BE] overflow-hidden">
                        <img
                          src={userimg}
                          className="object-cover w-full h-full cursor-pointer"
                          alt="User"
                        />
                      </div>
                    )}

                  </Link>
                  <Link to="/profile">
                    <div className="flex h-full items-center">
                      <div className="nickname my-auto mr-2">{username}</div>
                    </div>
                  </Link>
                </div>

                <div className="bg-[#EEF9F3] w-full min-h-1/4 rounded-xl drop-shadow-lg mb-16">
                  <div className="flex flex-col px-6 py-4 h-full">
                    {sidebarData.length === 0 ? (
                      <div className="pr-2 text-center">
                        <p className="mb-3 text-[#8fbaa8] mt-3">
                          체크리스트를 등록하면 <br />할 수 있어에코
                        </p>
                        <Link to="/guide">
                          <button className="p-3 px-5 bg-[#8fbaa8] text-[#EDF8F3] rounded-lg">
                            가이드북 설정하러 가기
                          </button>
                        </Link>
                      </div>
                    ) : (
                      sidebarData &&
                      sidebarData
                        .slice(
                          currentPage * pageSize,
                          (currentPage + 1) * pageSize
                        )
                        .map((item, index) => (
                          <div
                            key={index}
                            className="flex top-0 h-full w-full drop-shadow-none"
                          >
                            <div className="my-auto drop-shadow-none">
                              <label
                                className="relative flex items-center mr-2 rounded-full cursor-pointer"
                                htmlFor="customStyle"
                              >
                                <input
                                  type="checkbox"
                                  checked={item.isComplete === 1}
                                  onChange={() => handleCheckboxChange(index)}
                                  className="before:content[''] peer relative h-6 w-6 cursor-pointer appearance-none rounded-full border-2 border-[#C3E0D1] bg-white transition-all checked:border-[#C3E0D1] checked:bg-[#DDEEE5] hover:scale-105"
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
                                    ></path>
                                  </svg>
                                </span>
                              </label>
                            </div>
                            <div className="my-auto text-sm py-2">
                              {item.guideNM}
                            </div>
                          </div>
                        ))
                    )}
                    <div className="text-center flex flex-1 justify-center">
                      {sidebarData.length < (currentPage + 1) * pageSize &&
                        sidebarData.length != 0 && (
                          <button
                            className="text-xl"
                            onClick={showLessItems}
                          >
                            {" "}
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m17 14l-5-5l-5 5"/></svg>{" "}
                          </button>
                        )}
                      {sidebarData.length > (currentPage + 1) * pageSize && (
                        <button className="text-xl" onClick={showMoreItems}>
                          {" "}
                          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m7 10l5 5l5-5"/></svg>
                          {" "}
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-center items-center">
                  <Link to="/plan" className="text-[#498D80] mb-5">
                    체크리스트 만들기
                  </Link>
                  <Link to="/checkliststate" className="text-[#498D80] mb-5">
                    체크리스트 현황
                  </Link>
                  <Link to="/guide" className="text-[#498D80] mb-10">
                    가이드북
                  </Link>
                  <div className="w-1/2 h-1 mx-auto bg-[#C3E0D1] mb-5" />
                  <button className="text-[#498D80]" onClick={handleLogout}>
                    로그아웃
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 데스크톱 화면에서는 바로 로그인과 회원가입 표시 */}
        <ul className="hidden md:flex list-none pr-12 my-auto">
          <li className="ml-10">
            <button className="text-[#498D80]" onClick={handleLogout}>
              로그아웃
            </button>
          </li>
          <li className="ml-10">
            <Link to="/plan" className="text-[#498D80]">
              체크리스트 만들기
            </Link>
          </li>
          <li className="ml-10">
            <Link to="/checkliststate" className="text-[#498D80]">
              체크리스트 현황
            </Link>
          </li>
          <li className="ml-10">
            <Link to="/guide" className="text-[#498D80]">
              가이드북
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
