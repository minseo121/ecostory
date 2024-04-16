import React, {useEffect, useState} from "react";
import '../css/login.css'

function Login_page() {
    return(
        <>
        <div className="Login bg-[#D3E7DD]">
            <div className="container mx-auto">
                <div className="login_content w-full bg-white text-[#589B7F] text-lg h-screen flex flex-col justify-center items-center pt-20">
                    <div className="mb-10">
                        <div className="login_title mb-5 mr-24">
                            <p className="login_title1 text-4xl mb-3">로그인</p>
                            <p>사소한 실천이 나아가서 큰 변화가 오게 함께 해주세에코</p>
                        </div>
                        <hr/>
                        <form className="login_form mt-8 mx-10">
                            <div className="mb-3">
                                <p className="pl-1">아이디</p>
                                <input type="text" placeholder="아이디" className="id_input border-4 border-[#7bb49c56] w-full my-2 p-4 px-5 rounded-xl" />
                            </div>
                            <div>
                                <p className="pl-1">비밀번호</p>
                                <input type="password" placeholder="비밀번호" className="pw_input border-4 border-[#7bb49c56] w-full my-2 p-4 px-5 rounded-xl" />
                            </div>
                            <div className="flex items-center mt-3 mb-10">
                                <input type="checkbox"></input>
                                <label className="ml-3">로그인 상태 유지하기</label>
                            </div>
                            <div className="mt-5 flex justify-center text-[#ffff] mb-10">
                                <input type="button" value="로그인" className="btn_input bg-[#7BB49C] p-5 px-16 rounded-xl text-xl"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Login_page;