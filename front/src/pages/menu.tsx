import React , { useEffect } from 'react';
import Layout from '../components/Layout';
import Navigation from '../components/Navigation';
import Router from 'next/router';
import { useSelector } from 'react-redux';

const Login=()=>{

    const loginDone = useSelector(state=>state.user.loginDone);
    
    useEffect(()=>{
        // if(!loginDone){
        //     Router.push('/');
        // }
    },[loginDone]);

    return(
        <Layout PageName="메뉴">
            <Navigation/>
        </Layout>
    );
}

export default Login;