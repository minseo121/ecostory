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
                    <div className="absolute w-full top-0 left-0 mt-14 bg-white rounded-b-lg drop-shadow-md text-[#498D80]">
                        <form className="loginform mt-4 px-[7%]">
                            <div className="">
                                <p className="pl-1">아이디</p>
                                <input type="text" className="input_id border-[3px] border-[#7BB49C] bg-[#EEF9F3] h-11 w-full my-2 p-4 px-5 rounded-xl" />
                            </div>
                            <div>
                                <p className="pl-1">비밀번호</p>
                                <input type="password" className="input_pw border-[3px] border-[#7BB49C] bg-[#EEF9F3] h-11 w-full my-2 p-4 px-5 rounded-xl" />
                            </div>
                            <div className="flex items-center mb-1 text-xs">
                                <input type="checkbox"></input>
                                <label className="ml-3">로그인 상태 유지하기</label>
                            </div>
                            <div className="flex justify-end text-white mt-1 h-10"> 
                                <input type="button" value="로그인" className="login_btn bg-[#7BB49C] rounded-xl px-9"/>                                
                            </div>
                            <div className="flex justify-end mb-8 text-xs pr-1 pt-2"> 
                                <span className='text-[#A9D6C3]'>아이디가 없다면?&nbsp;</span>
                                <a className="text-[#498D80]" href="#">회원가입하기</a>
                            </div>                            
                        </form>
                    </div>
                )}
                {/* 데스크톱 화면에서는 바로 로그인과 회원가입 표시 */}
                <ul className="hidden md:flex list-none pr-12 my-auto">
                    <li className="ml-10">
                        <a className="text-[#498D80]" href="#">로그인</a>
                    </li>
                    <li className="ml-10">
                        <a className="text-[#498D80]" href="#">회원가입</a>
                    </li>
                </ul>
            </div>
        </div>    
    );
}

export default Header;


{/*
import react from 'react';

function Header() {
    return (
        <div className="nav bg-white flex h-16 w-full drop-shadow-md fixed top-0 left-0">
            <img className="logo w-full max-w-40 h-full max-h-14 my-auto ml-4" alt="ecostory_logo" src="img/ecostory_logo.png"/>
            <ul className="nav_contents list-none flex flex-1 justify-end pr-16 my-auto">
                <li className="ml-10">
                    <a className="text-[#498D80]" href="#">로그인</a>        
                </li>        
                <li className="ml-10">            
                    <a className="text-[#498D80]" href="#">회원가입</a>        
                </li>               
            </ul>
        </div>    
    );
}

export default Header;
*/}