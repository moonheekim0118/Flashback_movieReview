import React , { useEffect } from 'react';
import Layout from '../components/Layout';
import LoginForm from '../components/User/Login';
import Router from 'next/router';
import { useSelector } from 'react-redux';

const Login=()=>{

    const loginDone = useSelector(state=>state.user.loginDone);
    
    useEffect(()=>{
        if(loginDone){
            Router.replace('/');
        }
    },[loginDone]);

    return(
        <Layout PageName="로그인">
            <LoginForm/>
        </Layout>
    );
}

export default Login;