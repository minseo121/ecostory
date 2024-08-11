import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API } from "../../api/API";
import { useNavigate } from "react-router-dom";

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hide, setHide] = useState(true);

  //로그인 관련 useState
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API().post("/user/login", {
        userid: id,
        password: password,
      });
      if (response.status === 200 && response.data.token) {
        const token = response.data.token; // 토큰 받기
        localStorage.setItem("token", token); // 로컬 스토리지에 토큰 저장
        setLoginSuccess(true);
        // 로그인 성공 시 리디렉션
        navigate("/");
        window.location.reload(); // 페이지 새로고침
      } else {
        setLoginSuccess(false);
        console.log("로그인 실패:", response);
        setErrorMessage("유효하지 않은 아이디, 비밀번호입니다.");
      }
    } catch (error) {
      setLoginSuccess(false);
      console.log("먼 에러임 : ", error);
      setErrorMessage("유효하지 않은 아이디, 비밀번호입니다.");
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const onToggleHide = () => {
    setHide((prevHide) => !prevHide);
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
        <a className="block my-auto" href="/">
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
          <div className="absolute w-full top-0 left-0 mt-14 bg-white rounded-b-3xl drop-shadow-md text-[#498D80]">
            <div className="w-1/5 h-1 mx-auto bg-[#C3E0D1]" />
            <form className="loginform mt-4 px-[7%] " onSubmit={handleSubmit}>
              <div>
                <p className="pl-1">아이디</p>
                <input
                  type="text"
                  className="input_id border-[3px] border-[#7BB49C] bg-[#EEF9F3] h-11 w-full my-2 p-4 px-5 rounded-xl"
                  onChange={(e) => setId(e.target.value)}
                />
              </div>
              <div>
                <p className="pl-1">비밀번호</p>
                <div className="relative">
                  <input
                    type={hide ? "password" : "text"}
                    className="input_pw border-[3px] border-[#7BB49C] bg-[#EEF9F3] h-11 w-full my-2 p-4 px-5 rounded-xl"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {hide ? (
                    <div className="w-6 h-6 right-2 top-5 absolute">
                      <i className="bi bi-eye-fill" onClick={onToggleHide}></i>
                    </div>
                  ) : (
                    <div className="w-6 h-6 right-2 top-5 absolute">
                      <i
                        className="bi bi-eye-slash-fill"
                        onClick={onToggleHide}
                      ></i>
                    </div>
                  )}
                </div>
              </div>
              {errorMessage && (
                <p className="text-red-500 text-sm top-2 ">{errorMessage}</p>
              )}
              <div className="flex justify-end text-white mt-1 h-10">
                <input
                  type="submit"
                  value="로그인"
                  className="login_btn bg-[#7BB49C] rounded-xl px-9 hover:bg-[#589B7F] hover:cursor-pointer"
                />
              </div>
            </form>
            <div className="flex justify-end mb-8 px-[7%] text-xs pt-2">
              <span className="text-[#A9D6C3]">아이디가 없다면?&nbsp;</span>
              <Link to="/signup" className="text-[#498D80]">
                회원가입하기
              </Link>
            </div>
          </div>
        )}
        {/* 데스크톱 화면에서는 바로 로그인과 회원가입 표시 */}
        <ul className="hidden md:flex list-none pr-12 my-auto">
          <li className="ml-10">
            <Link to="/login" className="text-[#498D80]">
              로그인
            </Link>
          </li>
          <li className="ml-10">
            <Link to="/signup" className="text-[#498D80]">
              회원가입
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
