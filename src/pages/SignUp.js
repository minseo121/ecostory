import React, { useState } from 'react';
import Header from '../components/Header/Header_BeforeLogin';
import '../css/login.css'
import axios from "axios";

const SignUp = () => {
    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [morePassword, setMorePassword] = useState('');

    const [checkPassword, setCheckPassword] = useState(false);
    const [isPassword, setIsPassword] = useState(true);
    const [isIdPossible, setIsIdPossible] = useState(false);
    const [empty, setEmpty] = useState(false);
    const [emptyName, setEmptyName] = useState(false);

    const checkName = () => {
        if(!name){
            setEmptyName(true);
        }else{
            setEmptyName(false);
        }
    }
    const checkId =()=>{
        const response = { message : "이미 존재하는 아이디입니다."};
        if (response.message === "이미 존재하는 아이디입니다." && id){
            setIsIdPossible(true);
            setEmpty(false);
        }else if(!id){
            setEmpty(true);
            setIsIdPossible(false);
        }
        else{
            setIsIdPossible(false);
            setEmpty(false);
        }
    }
    const checkPw =(e)=>{ //비밀번호 유효성 검사
        setPassword(e.target.value);
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
        if (!passwordRegex.test(password)){
            setIsPassword(false);
            if(!name){
                setEmptyName(true);
                if(!id){
                    setEmpty(true);
                }else{
                    setEmpty(false);
                }
            }else{
                setEmptyName(false);
            }
        }else{
            setIsPassword(true);
            if(!name){
                setEmptyName(true);
                if(!id){
                    setEmpty(true);
                }else{
                    setEmpty(false);
                }
            }else{
                setEmptyName(false);
            }
        }
    }
    const checkPwMore = (e) =>{ //비밀번호 확인
        const nowPassword = e.target.value;
        setMorePassword(nowPassword);
        if (password === nowPassword) {
            setCheckPassword(true);
        } else {
            setCheckPassword(false);
        }
    }
    return (
        <div>
            <Header/>
            <div className="SignUp bg-[#D3E7DD]">
                <div className="container sm:w-3/4 mx-auto">
                <div className="signup_content w-full bg-white text-[#589B7F] text-lg h-min-screen flex flex-col justify-center items-center pt-28">
                    <div className="mb-10">
                        <div className="login_title mb-5 mr-24">
                            <p className="login_title1 text-2xl mb-1">회원가입</p>
                            <p className="text-[#7ab89d] text-sm">사소한 실천이 나아가서 큰 변화가 오게 함께 해주세에코</p>
                        </div>
                        <hr/>
                        <form className="login_form mt-8 mx-16">
                            <div className="mb-3">
                                <p className="pl-1">닉네임</p>
                                <input type="text" placeholder="에코" className="id_input border-4 border-[#7bb49c56] w-full my-2 p-3 rounded-xl" onChange={(e) => setName(e.target.value)} />
                                {emptyName && <p className="text-red-400 text-sm ml-2">닉네임을 입력해주세요.</p>}
                            </div>
                            <div className="mb-3">
                                <p className="pl-1">아이디</p>
                                <div className='flex'>
                                    <input type="text" placeholder="아이디" className="id_input border-4 border-[#7bb49c56] w-full my-2 p-3 rounded-xl mr-2" onChange={(e) => setId(e.target.value)} />
                                    <input type="button" value="중복확인" className="sbtn_input bg-[#7BB49C] m-2 px-12 rounded-xl text-lg text-white" onClick={checkId}/>
                                </div>
                                {isIdPossible && <p className="text-red-400 text-sm ml-2">이미 존재하는 아이디입니다.</p>}
                                {empty && <p className="text-red-400 text-sm ml-2">아이디를 입력해주세요.</p>}
                            </div>
                            <div>
                                <p className="pl-1">비밀번호</p>
                                <input type="password" placeholder="비밀번호" className="pw_input border-4 border-[#7bb49c56] w-full my-2 p-3 rounded-xl" onChange={checkPw}/>
                                {!isPassword && <p className="text-red-400 text-sm ml-2">숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!</p>}
                            </div>
                            <div>
                                <p className="pl-1 mt-3">비밀번호 확인</p>
                                <input type="password" placeholder="비밀번호" className="pw_input border-4 border-[#7bb49c56] w-full my-2 p-3 rounded-xl" onChange={checkPwMore} />
                                {checkPassword && <p className="text-green-400 text-sm ml-2">일치합니다!</p>}
                                {!checkPassword && <p className="text-red-400 text-sm ml-2">비밀번호가 불일치합니다.</p>}
                            </div>
                            <div className="mt-5 flex justify-center text-[#ffff] mb-10">
                                <input type="button" value="회원가입" className="btn_input bg-[#7BB49C] p-4 px-14 rounded-xl text-lg" onClick={checkPw}/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default SignUp;