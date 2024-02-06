import React, {useEffect, useState} from "react";
import Header from '../components/Header/Header_BeforeLogin';
import '../css/login.css'
import Login_page from "../components/Login_page";

function Login() {
    return(
        <>
        <Header/>
        <Login_page/>
        </>
    )
}

export default Login;