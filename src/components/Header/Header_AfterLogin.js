import React, { useState, useEffect } from 'react';

function checkList() {
    return(
        <div className='flex-1'>
            <div className='flex top-0 h-full w-full drop-shadow-none'>                                        
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
                <div className='my-auto text-sm'>
                    3km 걷기
                </div>                                        
            </div>
        </div>
    );
}

function Header() {    
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
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
            <a className="block my-auto" href="#">
                <img className="logo w-full max-w-40 h-full max-h-14 my-auto ml-4" alt="ecostory_logo" src="img/ecostory_logo.png"/>
            </a>
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
                                        <div className='nickname my-auto mr-2'>신민서</div>
                                        <div className='tier max-h-6 max-w-6 my-auto'>
                                            <img alt='tier' src='img/icon.png'/>
                                        </div>
                                    </div>                                                        
                                </div>  

                                <div className='bg-[#EEF9F3] w-full h-1/4 rounded-xl drop-shadow-lg mb-16'>
                                    <div className='flex flex-col px-6 py-4 h-full'>
                                        {checkList()}
                                        {checkList()}
                                        {checkList()}
                                        <div className='text-center flex flex-1 justify-center'> 
                                            <button className="text-xl mr-6"> &lt; </button> 
                                            <button className="text-xl"> &gt; </button> 
                                        </div>
                                    </div>

                                </div>

                                <div className='flex flex-col justify-center items-center'>                                
                                    <a className="text-[#498D80] mb-5" href="#">체크리스트 만들기</a>                                                                            
                                    <a className="text-[#498D80] mb-5" href="#">체크리스트 현황</a>                                 
                                    <a className="text-[#498D80] mb-10" href="#">가이드북</a>                               
                                    <div className='w-1/2 h-1 mx-auto bg-[#C3E0D1] mb-5'/>                             
                                    <a className="text-[#498D80]" href="#">로그아웃</a>                                           
                                </div>
                                
                            </div>
                        </div>
                    </div>
                )}

                {/* 데스크톱 화면에서는 바로 로그인과 회원가입 표시 */}
                <ul className="hidden md:flex list-none pr-12 my-auto">
                    <li className="ml-10">      
                        <a className="text-[#498D80]" href="#">로그아웃</a>
                    </li> 
                    <li className="ml-10">            
                        <a className="text-[#498D80]" href="#">체크리스트 만들기</a>        
                    </li>      
                    <li className="ml-10">            
                        <a className="text-[#498D80]" href="#">체크리스트 현황</a>        
                    </li>   
                    <li className="ml-10">            
                        <a className="text-[#498D80]" href="#">가이드북</a>        
                    </li>   
                </ul>
            </div>
        </div>    
    );
    {/*
    return (
        
        
        <div className="nav bg-white flex h-14 w-full drop-shadow-md fixed top-0 left-0 z-50">   
            <img className="logo w-full max-w-40 h-full max-h-14 my-auto ml-4" alt="ecostory_logo" src="img/ecostory_logo.png"/>
            <ul className="nav_contents list-none flex flex-1 justify-end pr-16 my-auto">        
                <li className="ml-10">      
                    <a className="text-[#498D80]" href="#">로그아웃</a>
                </li> 
                <li className="ml-10">            
                    <a className="text-[#498D80]" href="#">체크리스트 만들기</a>        
                </li>      
                <li className="ml-10">            
                    <a className="text-[#498D80]" href="#">체크리스트 현황</a>        
                </li>   
                <li className="ml-10">            
                    <a className="text-[#498D80]" href="#">가이드북</a>        
                </li>            
            </ul>
        </div>        
    );
    */}
}

export default Header;