import React from 'react';
import Header from '../components/Header/Header_BeforeLogin';
import '../css/login.css'

const SignUp = () => {
    return (
        <div>
            <Header/>
            <div className="SignUp bg-[#D3E7DD]">
            <div className="container mx-auto">
                <div className="signup_content w-full bg-white text-[#589B7F] text-lg h-screen flex flex-col justify-center items-center">
                    <div className="mb-10">
                        <div className="login_title mb-5 mr-24">
                            <p className="login_title1 text-4xl mb-3">회원가입</p>
                            <p>사소한 실천이 나아가서 큰 변화가 오게 함께 해주세에코</p>
                        </div>
                        <hr/>
                        <form className="login_form mt-8 mx-10">
                            <div className="mb-3">
                                <p className="pl-1">닉네임</p>
                                <input type="text" placeholder="에코" className="id_input border-4 border-[#7bb49c56] w-full my-2 p-4 px-5 rounded-xl" />
                            </div>
                            <div className="mb-3">
                                <p className="pl-1">아이디</p>
                                <div className='flex'>
                                    <input type="text" placeholder="아이디" className="id_input border-4 border-[#7bb49c56] w-full my-2 p-4 px-5 rounded-xl mr-2" />
                                    <input type="button" value="중복확인" className="sbtn_input bg-[#7BB49C] m-2 px-16 rounded-xl text-xl text-white"/>
                                </div>
                            </div>
                            <div>
                                <p className="pl-1">비밀번호</p>
                                <input type="password" placeholder="비밀번호" className="pw_input border-4 border-[#7bb49c56] w-full my-2 p-4 px-5 rounded-xl" />
                            </div>
                            <div>
                                <p className="pl-1 mt-3">비밀번호 확인</p>
                                <input type="password" placeholder="비밀번호" className="pw_input border-4 border-[#7bb49c56] w-full mt-2 my-2 p-4 px-5 rounded-xl" />
                            </div>
                            <div className="mt-5 flex justify-center text-[#ffff] mb-10">
                                <input type="button" value="회원가입" className="btn_input bg-[#7BB49C] p-5 px-16 rounded-xl text-xl"/>
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