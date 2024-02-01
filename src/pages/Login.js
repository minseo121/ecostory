import React, {useEffect, useState} from "react";
import Header from '../components/Header/Header_BeforeLogin';
import '../css/login.css'

function Login() {
    return(
        <>
        <div className="Login bg-[#D3E7DD]">
        <Header/>
            <div className="container relative mx-auto">
                <div className="w-full bg-white h-screen flex flex-col justify-center items-center">
                    <div className="mb-10">
                        <div className="login_title mb-5">
                            <p className="text-4xl mb-2">로그인</p>
                            <p>사소한 실천이 나아가서 큰 변화가 오게 함께 해주세에코</p>
                            <hr/>
                        </div>
                        <form className="login_form">
                            <div className="mb-3">
                                <p>아이디</p>
                                <input type="text" placeholder="아이디" className="border-2 w-full my-1 p-2 rounded-xl" />
                            </div>
                            <div>
                                <p>비밀번호</p>
                                <input type="password" placeholder="비밀번호" className="border-2 w-full my-1 p-2 rounded-xl" />
                            </div>
                            <div className="flex items-center mt-3">
                                <input type="checkbox"></input>
                                <label className="ml-2">로그인 상태 유지하기</label>
                            </div>
                            <div className="mt-5 flex justify-center">
                                <input type="button" value="로그인" className="bg-[#7BB49C] p-3 px-10 rounded-xl"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Login;