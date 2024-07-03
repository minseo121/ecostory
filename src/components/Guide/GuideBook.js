import React, { useState, useEffect } from "react";
import "../../css/Main.css";
import axios from "axios";
import Loading from "../animation/animation.js";
import { API } from "../../api/API.js";

function GuideContent({ guideName, guideId, isChecked, handleCheck }) {
  return (
    <div
      className={`flex h-16 w-full drop-shadow-md rounded-3xl px-5 md:px-10 ${isChecked ? "bg-[#CACACA]/[.5]" : "bg-white"}`}
    >
      <div className="my-auto">{guideName}</div>
      <div className="my-auto ml-auto">
        <label
          className="relative flex items-center py-2 mr-2 rounded-full cursor-pointer"
          htmlFor="customStyle"
        >
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => handleCheck(guideId)}
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
    </div>
  );
}

function GuideBook() {
  const [categories, setCategories] = useState([]);
  const [guideBookList, setGuideBookList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [endGuideId, setEndGuideId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isOpen, setIsOpen] = useState(false); // 드롭다운 메뉴의 상태를 관리
  const [isEndMap, setIsEndMap] = useState({}); // 각 카테고리의 Isend 값을 저장하는 객체
  const [isLoading, setIsLoading] = useState(false); // 가이드 더보기 버튼 > 로딩 상태를 관리
  const [checklist, setChecklist] = useState({ category_Id: [], guide_Id: [] });
  const [month, setMonth] = useState(0); //'이번 달 목표에 넣기' 버튼을 누르면 현재 날짜에 대한 정보를 저장
  const [weekOfMonth, setWeekOfMonth] = useState(0);

  //가이드북 초기값
  useEffect(() => {
    axios
      .get("http://13.209.53.13:8000/guide/viewmain", { withCredentials: true })
      .then((response) => {
        const data = response.data;
        console.log("초기 가이드 리스트 요청 성공 : ", data);

        setCategories(data.map((category) => category.category_NM));
        setSelectedCategory(data[0].category_NM); // 첫 번째 카테고리를 기본 선택으로 설정
        setGuideBookList(data);
      })
      .catch((error) => {
        console.error("초기 가이드 리스트 요청 실패 : ", error);
      });
  }, []);

  //현재 선택된 카테고리의 id를 찾는 함수
  const getCategoryId = () => {
    const selectedCategoryData = guideBookList.find(
      (guide) => guide.category_NM === selectedCategory
    );
    return selectedCategoryData ? selectedCategoryData.category_Id : null;
  };

  // 현재 선택된 카테고리의 마지막 가이드 아이디만 저장
  useEffect(() => {
    const selectedCategoryData = guideBookList.find(
      (category) => category.category_NM === selectedCategory
    );
    if (selectedCategoryData) {
      const endId = selectedCategoryData.guide_NM.reduce(
        (max, guide) => Math.max(max, guide.guide_Id),
        0
      );
      setEndGuideId(endId);
    } else {
      setEndGuideId(null);
    }
  }, [guideBookList, selectedCategory]);

  // 가이드 더보기 버튼
  const handleAddGuides = () => {
    setIsLoading(true);
    const categoryId = getCategoryId();

    if (!categoryId) {
      console.error("Category ID not found");
      return;
    }

    //db에 남아있는 데이터가 없어 true가 왔다면 gpt prompt 전달(커스텀 데이터 생성)
    if (isEndMap[selectedCategory]) {
      const customData = {
        prompt: `친환경을 위해 실천할 수 있는 요소를 ${selectedCategory} 카테고리로 10가지만 JSON 형식으로 출력해줘`,
        category_NM: selectedCategory,
      };

      axios
        .post("http://13.209.53.13:8000/guide/askmore", customData, {
          withCredentials: true,
        })
        .then((customResponse) => {
          console.log("커스텀 데이터 요청 성공 : ", customResponse.data);

          setGuideBookList((prev) => {
            const updatedList = prev.map((category) => {
              if (category.category_NM === selectedCategory) {
                return {
                  ...category,
                  guide_NM: [...category.guide_NM, ...customResponse.data],
                };
              }
              return category;
            });
            return updatedList;
          });
          setIsLoading(false);
        })
        .catch((customError) => {
          console.error("커스텀 데이터 요청 실패 : ", customError);
          setIsLoading(false);
        });
    } else {
      const IdData = {
        end_guide_Id: endGuideId,
        category_Id: categoryId,
      };

      axios
        .post("http://13.209.53.13:8000/guide/view", IdData, {
          withCredentials: true,
        })
        .then((response) => {
          console.log(IdData);
          console.log("더보기 요청 성공 : ", response.data);

          const newGuides = response.data;
          const isEnd = newGuides.some((guide) => guide.Isend === "true");

          if (isEnd) {
            setIsEndMap((prev) => ({ ...prev, [selectedCategory]: true }));
          }

          setGuideBookList((prevGuideBookList) => {
            return prevGuideBookList.map((category) => {
              if (category.category_NM === selectedCategory) {
                return {
                  ...category,
                  guide_NM: [...category.guide_NM, ...newGuides], // newGuides 추가
                };
              }
              return category;
            });
          });
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("더보기 요청 실패 : ", error);
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //카테고리 선택
  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    setIsOpen(false);
  };

  // 검색어에 따라 가이드를 필터링하는 함수
  const getFilteredGuides = () => {
    if (!selectedCategory) return [];
    const selectedCategoryData = guideBookList.find(
      (guide) => guide.category_NM === selectedCategory
    );
    if (!selectedCategoryData) return [];
    return selectedCategoryData.guide_NM.filter(
      (guide) =>
        guide.guide_NM &&
        guide.guide_NM.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // 체크박스 상태 변경 핸들러
  const handleCheck = (guideId) => {
    setChecklist((prevChecklist) => {
      const isAlreadyChecked =
        prevChecklist.guide_Id?.includes(guideId) || false;
      const currentCategoryId = getCategoryId();

      // 가이드 ID 업데이트
      const updatedGuideIds = isAlreadyChecked
        ? prevChecklist.guide_Id.filter((id) => id !== guideId)
        : [...(prevChecklist.guide_Id || []), guideId];

      // 해당 카테고리에 속한 다른 가이드들이 여전히 체크되어 있는지 확인
      const isAnyOtherGuideChecked = updatedGuideIds.some((id) => {
        const guide = guideBookList.find((g) =>
          g.guide_NM.some((guide) => guide.guide_Id === id)
        );
        return guide && guide.category_Id === currentCategoryId;
      });

      // 카테고리 ID 업데이트
      const updatedCategoryIds =
        isAlreadyChecked && !isAnyOtherGuideChecked
          ? prevChecklist.category_Id.filter((id) => id !== currentCategoryId)
          : [
              ...new Set([
                ...(prevChecklist.category_Id || []),
                currentCategoryId,
              ]),
            ];

      const updatedChecklist = {
        category_Id: updatedCategoryIds,
        guide_Id: updatedGuideIds,
      };

      console.log("업데이트된 checklist:", updatedChecklist); // 디버깅을 위해 추가

      return updatedChecklist;
    });
  };

  //현재 몇 주차인지 구하는 함수
  const getCurrentWeek = (date) => {
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const pastDaysOfMonth = (date - startOfMonth) / 86400000;
    return Math.ceil((pastDaysOfMonth + startOfMonth.getDay() + 1) / 7);
  };

  //렌더링 시 현재 날짜 정보를 저장
  useEffect(() => {
    const now = new Date();
    setMonth(now.getMonth() + 1); // 월은 0부터 시작하므로 1을 더해줌
    setWeekOfMonth(getCurrentWeek(now));
  }, []);

  // 이번 달 목표에 추가하기 버튼을 누르면 실행되는 핸들러
  const handleAddGoal = async () => {
    const checklistData = {
      date: month,
      week: weekOfMonth,
      checklist: checklist,
    };

    console.log("checklistData:", checklistData); // 디버깅을 위해 추가

    try {
      const response = await API().post(
        "/guide/makeplan",
        checklistData,
        {
          withCredentials: true,
        },
        {
          headers: {
            "Content-Type": "application/json", // 필요 시 추가
          },
        }
      );
      console.log("데이터 요청 성공:", response.data);
    } catch (error) {
      console.error(
        "데이터 요청 실패:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="guidebook flex text-[#589B7F] h-screen">
      {windowWidth > 640 && (
        <div className="category_frame bg-[#D3E7DD] h-full w-[185px] text-lg fixed pt-14">
          <div className="h-[8%]" />
          <div className="h-full">
            <div className="category bg-[#EDF8F3] relative h-5/6 w-5/6 mx-auto rounded-2xl drop-shadow-lg flex flex-col">
              <div className="ml-4 h-[50px] flex items-center">카테고리</div>

              <div className="category_list flex-1 bg-white h-full w-11/12 mb-2 mx-auto rounded-b-lg shadow-inner p-5">
                {categories.map((category) => (
                  <div className="mb-2" key={category}>
                    <button
                      className={`${selectedCategory === category ? "text-[#589B7F]" : "text-[#589B7F]/[.45]"}`}
                      onClick={() => handleCategoryClick(category)}
                    >
                      {" "}
                      {category}{" "}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="guidebook_page flex-1 h-screen sm:pl-[185px] pt-14 ">
        <div className="h-full px-2 sm:px-10 pt-5">
          <div className="sm:flex mb-5 max-[640px]:mx-5">
            <div>
              <p className="text-2xl max-[640px]:mb-1">목록</p>
              <p className="text-sm max-[640px]:mb-3">
                체크리스트에 넣고 싶은 목표들을{" "}
                <span className="text-[#61D2A2]">체크</span>해봐요.
              </p>
            </div>

            <div className="list_search ml-auto my-auto bg-[#EDF8F3] h-11 sm:w-[336px] rounded-full flex items-center">
              <div className="search_icon ml-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="#9DA4A0"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                </svg>
              </div>
              <div className="search_textbox flex-1 ml-3 my-auto">
                <input
                  className="bg-[#EDF8F3] outline-none w-11/12"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                ></input>
              </div>
            </div>
          </div>

          <div className="bg-[#A9D6C3] relative h-[70%] w-full rounded-3xl shadow-inner flex flex-col">
            <div className="category_title text-xl text-white mx-8 py-[12px]">
              {windowWidth > 640 ? (
                selectedCategory
              ) : (
                <div className="relative w-full flex justify-between">
                  {selectedCategory}
                  <button
                    className="text-xl text-white flex justify-end"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    {" "}
                    ▼
                  </button>
                  {/* Dropdown menu */}
                  {isOpen && (
                    <div className="absolute right-0 mt-10 w-full bg-white border rounded-b-lg shadow-lg z-20">
                      {categories.map((category) => (
                        <button
                          key={category}
                          className={`${selectedCategory === category ? "text-[#589B7F]" : "text-[#589B7F]/[.45]"} text-start w-full block px-4 py-2 text-sm hover:bg-gray-300 ${
                            selectedCategory === category ? "font-semibold" : ""
                          }`}
                          onClick={() => handleCategoryClick(category)}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="guide_contents_frame relative bg-[#EEF9F3] h-full rounded-b-3xl mx-2 mb-2">
              <div className="absolute h-full w-full overflow-auto">
                <div className="m-4 lg:m-7 grid grid-cols-1 lg:grid-cols-2 lg:gap-x-10 gap-y-5 justify-items-center">
                  {getFilteredGuides().map((guide) => (
                    <GuideContent
                      key={guide.guide_Id}
                      guideName={guide.guide_NM}
                      guideId={guide.guide_Id}
                      isChecked={checklist.guide_Id.includes(guide.guide_Id)}
                      handleCheck={handleCheck}
                    />
                  ))}
                </div>

                {searchTerm === "" && (
                  <div className="flex justify-center text-center my-8">
                    {isLoading ? (
                      <Loading />
                    ) : (
                      <button
                        className="bg-[#C3E0D1] rounded-full px-3 py-1"
                        onClick={handleAddGuides}
                      >
                        + 가이드 더보기
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="text-center pt-7 pb-3 mb-5">
            <div>
              <button
                className="bg-[#61D2A2] h-[55px] w-[270px] text-white text-xl py-2 px-4 rounded-xl"
                onClick={handleAddGoal}
              >
                이번 달 목표에 넣기
              </button>
            </div>
            <p className="text-sm text-[#8E8E8E] mt-2">
              체크 표시된 회색 선택지는 이미 추가된 목표예요!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GuideBook;
