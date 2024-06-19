import React, { useState } from "react";
import '../css/login.css';
import { API } from "../api/API";

function Login_page() {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await API().post('/user/login', 
                {
                    userid: id,
                    password: password
                }
            );
            if (response.status === 200) {
                setLoginSuccess(true);
                setErrorMessage('');
            } else {
                setLoginSuccess(false);
                setErrorMessage('로그인에 실패했습니다. 다시 시도해주세요.');
            }
        } catch (error) {
            setLoginSuccess(false);
            setErrorMessage('로그인에 실패했습니다. 다시 시도해주세요.');
            console.log("먼 에러임 : ",error)
        }
    };

    return (
        <>
            <div className="Login bg-[#D3E7DD]">
                <div className="container sm:w-3/4 mx-auto">
                    <div className="login_content w-full bg-white text-[#589B7F] text-lg h-screen flex flex-col justify-center items-center pt-36">
                        <div className="mb-10 w-9/14">
                            <div className="login_title mb-5 mr-24">
                                <p className="login_title1 text-2xl mb-1">로그인</p>
                                <p className="text-[#7ab89d] text-sm">사소한 실천이 나아가서 큰 변화가 오게 함께 해주세에코</p>
                            </div>
                            <hr />
                            <form className="login_form mt-8 mx-16" onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <p className="pl-1">아이디</p>
                                    <input type="text" placeholder="아이디" className="id_input border-4 border-[#7bb49c56] w-full my-2 p-3 rounded-xl" onChange={(e) => setId(e.target.value)} />
                                </div>
                                <div>
                                    <p className="pl-1">비밀번호</p>
                                    <input type="password" placeholder="비밀번호" className="pw_input border-4 border-[#7bb49c56] w-full my-2 p-3 rounded-xl" onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className="flex items-center mt-3 mb-10">
                                    <input type="checkbox"></input>
                                    <label className="ml-3 text-sm">로그인 상태 유지하기</label>
                                </div>
                                <div className="mt-5 flex justify-center text-[#ffff] mb-10">
                                    <button type="submit" className="btn_input bg-[#7BB49C] p-4 px-14 rounded-xl text-lg">로그인</button>
                                </div>
                                {loginSuccess && <p className="text-green-500">로그인 성공했다</p>}
                                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login_page;
