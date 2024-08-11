import React, { useState } from 'react';
import Header from '../components/Header/Header_BeforeLogin';
import '../css/login.css'
import axios from "axios";
import { Link } from 'react-router-dom';
import SuccessModal from '../components/Modal/SuccessModal';

const SignUp = () => {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [morePassword, setMorePassword] = useState('');

  const [checkPassword, setCheckPassword] = useState(false);
  const [isPassword, setIsPassword] = useState(true);
  const [isIdPossible, setIsIdPossible] = useState(false); //중복확인 확인
  const [isIdCheck, setIsIdCheck] = useState(false); //중복확인 했는지 여부 확인 
  const [empty, setEmpty] = useState(false); //입력란에 비어있는지 확인
  const [emptyName, setEmptyName] = useState(false);

  const [showModal, setShowModal] = useState(false); // 모달 상태

  const [hide, setHide] = useState(true);
  const [secondHide, setSecondHide]= useState(true);

  const onToggleHide = () => { //비번 확인(눈)
    setHide(prevHide => !prevHide);
  };
  const onSecondToggleHide = () => { //비번 확인(눈2)
    setSecondHide(prevHide => !prevHide);
  };

  const checkName = () => {
    if (!name) {
      setEmptyName(true);
    } else {
      setEmptyName(false);
    }
  }

  const checkId = async () => {
    if (!id) {
      setEmpty(true);
      setIsIdPossible(false);
      return;
    }
    try {
      const response = await axios.post('http://13.209.53.13:8000/user/checkid', { 'userid': id }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.data.message === "success") {
        setIsIdPossible(false);
        setEmpty(false);
        setIsIdCheck(true);
      }
    } catch (error) {
      if (error.response.data.message === "이미 존재하는 아이디입니다.") {
        setIsIdPossible(true); //이미 존재하는 아이디.
        setEmpty(false);
        setIsIdCheck(false);
      } else {
        console.error("다른 에러 : ", error);
      }
    }
  }

  const checkPw = (e) => {
    setPassword(e.target.value);
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
    if (!passwordRegex.test(e.target.value)) {
      setIsPassword(false);
    } else {
      setIsPassword(true);
    }
    checkName();
  }

  const checkPwMore = (e) => {
    const nowPassword = e.target.value;
    setMorePassword(nowPassword);
    if (password === nowPassword) {
      setCheckPassword(true);
    } else {
      setCheckPassword(false);
    }
  }

  const handleSubmit = async () => {
    checkName();
    checkId();
    if (!name || !id || !password || !morePassword || !isPassword || !checkPassword) {
      return;
    }
    try {
      const response = await axios.post('http://13.209.53.13:8000/user/signup', {
        userid: id,
        password: password,
        name: name,
        checkpw: morePassword
      });
      setShowModal(true); // 가입 성공 시 모달 띄우기
      console.log(response.data);
    } catch (error) {
      console.error("회원가입 문제 : ", error);
    }
  }

  return (
    <div>
      <Header />
      <div className="SignUp bg-[#D3E7DD]">
        <div className="container sm:w-3/4 mx-auto">
          <div className="signup_content w-full bg-white text-[#589B7F] text-lg h-min-screen flex flex-col justify-center items-center pt-28">
            <div className="mb-10">
              <div className="login_title mb-5 mr-24">
                <p className="login_title1 text-2xl mb-1">회원가입</p>
                <p className="text-[#7ab89d] text-sm">사소한 실천이 나아가서 큰 변화가 오게 함께 해주세에코</p>
              </div>
              <hr />
              <form className="login_form mt-8 mx-16" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                <div className="mb-3">
                  <p className="pl-1">닉네임</p>
                  <input type="text" placeholder="에코" className="id_input border-4 border-[#7bb49c56] w-full my-2 p-3 rounded-xl" onChange={(e) => setName(e.target.value)} />
                  {emptyName && <p className="text-red-400 text-sm ml-2">닉네임을 입력해주세요.</p>}
                </div>
                <div className="mb-3">
                  <p className="pl-1">아이디</p>
                  <div className='flex'>
                    <input type="text" placeholder="아이디" className="id_input border-4 border-[#7bb49c56] w-full my-2 p-3 rounded-xl mr-2" onChange={(e) => setId(e.target.value)} />
                    <input type="button" value="중복확인" className="sbtn_input bg-[#7BB49C] m-2 px-12 rounded-xl text-lg text-white hover:bg-[#589B7F] hover:cursor-pointer" onClick={checkId} />
                  </div>
                  {isIdPossible && <p className="text-red-400 text-sm ml-2">이미 존재하는 아이디입니다.</p>}
                  {empty && <p className="text-red-400 text-sm ml-2">아이디를 입력해주세요.</p>}
                  {isIdCheck && !empty && <p className="text-green-400 text-sm ml-2">사용 가능한 아이디입니다.</p>}
                </div>
                <div>
                  <p className="pl-1">비밀번호</p>
                  <div className='relative'>
                    <input type={hide ? 'password' : 'hide'} placeholder="비밀번호" className="pw_input border-4 border-[#7bb49c56] w-full my-2 p-3 rounded-xl" onChange={checkPw} />
                    {hide ? (
                      <div className="w-6 h-6 right-3 bottom-4 sm:bottom-0 sm:top-6 bg-white absolute">
                        <i className="bi bi-eye-fill" onClick={onToggleHide}></i>
                      </div>
                    ) : (
                      <div className="w-6 h-6 right-3 bottom-4 sm:bottom-0 sm:top-6 bg-white absolute">
                        <i className="bi bi-eye-slash-fill" onClick={onToggleHide}></i>
                      </div>
                    )}
                  </div>
                  {!isPassword && <p className="text-red-400 text-sm ml-2">숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!</p>}
                </div>
                <div>
                  <p className="pl-1 mt-3">비밀번호 확인</p>
                  <div className='relative'>
                    <input type={secondHide ? 'password' : 'hide'} placeholder="비밀번호" className="pw_input border-4 border-[#7bb49c56] w-full my-2 p-3 rounded-xl" onChange={checkPwMore} />
                    {secondHide ? (
                      <div className="w-6 h-6 right-3 bottom-4 sm:bottom-0 sm:top-6 bg-white absolute">
                        <i className="bi bi-eye-fill" onClick={onSecondToggleHide}></i>
                      </div>
                    ) : (
                      <div className="w-6 h-6 right-3 bottom-4 sm:bottom-0 sm:top-6 bg-white absolute">
                        <i className="bi bi-eye-slash-fill" onClick={onSecondToggleHide}></i>
                      </div>
                    )}
                  </div>
                  {checkPassword && <p className="text-green-400 text-sm ml-2">일치합니다!</p>}
                  {!checkPassword && <p className="text-red-400 text-sm ml-2">비밀번호가 불일치합니다.</p>}
                </div>
                <div className="mt-5 flex justify-center text-[#ffff] mb-10">
                  <input type="submit" value="회원가입" className="btn_input bg-[#7BB49C] p-4 px-14 rounded-xl text-lg hover:bg-[#589B7F] hover:cursor-pointer" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {showModal && <SuccessModal />}
    </div>

  );
};

export default SignUp;
