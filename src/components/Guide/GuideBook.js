import React, { useState, useEffect } from 'react';
import { guideData } from "./GuideData";
import { moreGuideData } from "./MoreGuideData";
import '../../css/Main.css'

function GuideContent({ guideName }) {
    const [isChecked, setIsChecked] = useState(false);

    return (
        <div className={`flex h-16 w-full drop-shadow-md rounded-3xl px-5 md:px-10 ${isChecked ? 'bg-[#CACACA]/[.5]' : 'bg-white'}`}>
            <div className='my-auto'>
                {guideName}
            </div>
            <div className='my-auto ml-auto'>
                <label className="relative flex items-center py-2 mr-2 rounded-full cursor-pointer" htmlFor="customStyle">
                    <input 
                        type="checkbox"
                        checked={isChecked}
                        onClick={() => setIsChecked(!isChecked)}
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
        </div>
    );
}

function GuideBook() {
    const categories = [...new Set(guideData.guide.map(guide => guide.category_NM))];
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    const [moreGuide, setMoreGuide] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isOpen, setIsOpen] = useState(false); // 드롭다운 메뉴의 상태를 관리합니다.

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleCategoryClick = (categoryName) => {
        setSelectedCategory(categoryName);
        setMoreGuide(false);
        setIsOpen(false); 
    }

    const handleMoreCategoryClick = () => {
        setMoreGuide(true);
    }

    return (
        <div className='guidebook flex text-[#589B7F] h-screen'>
            {windowWidth > 640 && (
                <div className='category_frame bg-[#D3E7DD] h-full w-[185px] text-lg fixed pt-14'>
                    <div className="h-[8%]" />
                    <div className='h-full'>
                        <div className='category bg-[#EDF8F3] relative h-5/6 w-5/6 mx-auto rounded-2xl drop-shadow-lg flex flex-col'>
                            <div className='ml-4 h-[50px] flex items-center'>
                                카테고리
                            </div>

                            <div className='category_list flex-1 bg-white h-full w-11/12 mb-2 mx-auto rounded-b-lg shadow-inner p-5'>
                                {categories.map(category => (
                                    <div className='mb-2' key={category}>
                                        <button className={`${selectedCategory === category ? 'text-[#589B7F]' : 'text-[#589B7F]/[.45]'}`} onClick={() => handleCategoryClick(category)}>{category}</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className='guidebook_page flex-1 h-screen sm:pl-[185px] pt-14 '>
                <div className='h-full px-2 sm:px-10 pt-5'>
                    <div className='sm:flex mb-5 max-[640px]:mx-5'>
                        <div>
                            <p className='text-2xl max-[640px]:mb-1'>목록</p>
                            <p className='text-sm max-[640px]:mb-3'>
                                체크리스트에 넣고 싶은 목표들을 <span className='text-[#61D2A2]'>체크</span>해봐요.
                            </p>
                        </div>
                        <div className='list_search ml-auto my-auto bg-[#EDF8F3] h-11 sm:w-[336px] rounded-full flex items-center'>
                            <div className='search_icon ml-4'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#9DA4A0">
                                    <path d="M0 0h24v24H0z" fill="none" />
                                    <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                                </svg>
                            </div>
                            <div className='search_textbox flex-1 ml-3 my-auto'>
                                <input className='bg-[#EDF8F3] outline-none w-11/12'></input>
                            </div>
                        </div>
                    </div>

                    <div className='bg-[#A9D6C3] relative h-[70%] w-full rounded-3xl shadow-inner flex flex-col'>
                        <div className='category_title text-xl text-white mx-8 py-[12px]'>
                            {windowWidth > 640 ? (
                                selectedCategory
                            ) : (
                                <div className="relative w-full flex justify-between">
                                    {selectedCategory} 
                                    <button className="text-xl text-white flex justify-end" onClick={() => setIsOpen(!isOpen)}> ▼
                                    </button>
                                    {/* Dropdown menu */}
                                    {isOpen && (
                                        <div className="absolute right-0 mt-10 w-full bg-white border rounded-b-lg shadow-lg z-20">
                                            {categories.map(category => (
                                                <button
                                                    key={category}
                                                    className={`${selectedCategory === category ? 'text-[#589B7F]' : 'text-[#589B7F]/[.45]'} text-start w-full block px-4 py-2 text-sm hover:bg-gray-300 ${
                                                        selectedCategory === category ? 'font-semibold' : ''
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
                            
                        <div className='guide_contents_frame relative bg-[#EEF9F3] h-full rounded-b-3xl mx-2 mb-2'>
                            <div className='absolute h-full w-full overflow-auto'>
                                <div className='m-4 lg:m-7 grid grid-cols-1 lg:grid-cols-2 lg:gap-x-10 gap-y-5 justify-items-center'>
                                    {guideData.guide
                                        .filter((guide) => guide.category_NM === selectedCategory)
                                        .map((guide) => (
                                            <GuideContent key={guide.guide_Id} guideName={guide.guide_NM} />
                                        ))}

                                    {moreGuide ?
                                        moreGuideData.data                                            
                                            .map((data) => (
                                                <GuideContent key={data.guide_Id} guideName={data.guide_NM} />
                                            ))
                                        : null}

                                </div>
                                <div className='text-center my-8'>
                                    <button className='bg-[#C3E0D1] rounded-full px-3 py-1' onClick={() => handleMoreCategoryClick()}>+ 가이드 더보기</button>
                                </div>
                            </div>
                                        
                        </div>
                    </div>

                    <div className='text-center pt-7 pb-3 mb-5'>
                        <div>
                            <button className="bg-[#61D2A2] h-[55px] w-[270px] text-white text-xl py-2 px-4 rounded-xl">
                                이번 달 목표에 넣기
                            </button>
                        </div>
                        <p className='text-sm text-[#8E8E8E] mt-2'>체크 표시된 회색 선택지는 이미 추가된 목표예요!</p>
                    </div>
                </div>
            </div>
        </div>     
    );
}

export default GuideBook;