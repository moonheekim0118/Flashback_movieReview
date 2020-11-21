import React , { useEffect } from 'react';
import Layout from '../components/Layout';
import SignUpForm from '../components/User/SignUp';
import Router from 'next/router';
import { useSelector } from 'react-redux';


const SingUp=()=>{

    const signUpDone = useSelector(state=>state.user.signUpDone);

    useEffect(()=>{
        if(signUpDone){
            Router.push('/');
        }
    },[signUpDone]);

    return(
        <Layout PageName="회원가입">
            <SignUpForm/>
        </Layout>
    );
}

export default SingUp;