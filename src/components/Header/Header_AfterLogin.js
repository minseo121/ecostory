import React, { useState, useEffect } from 'react';

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
                    <ul className="absolute w-full top-0 left-0 mt-14 bg-white rounded-b-lg drop-shadow-md">
                        <li>
                            <a className="block py-2 px-4 text-[#498D80]" href="#">로그아웃</a>
                        </li>
                        <li>
                            <a className="block py-2 px-4 text-[#498D80]" href="#">체크리스트 만들기</a>
                        </li>
                        <li>
                            <a className="block py-2 px-4 text-[#498D80]" href="#">체크리스트 현황</a>
                        </li>
                        <li>
                            <a className="block py-2 px-4 text-[#498D80]" href="#">가이드북</a>
                        </li>
                    </ul>
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