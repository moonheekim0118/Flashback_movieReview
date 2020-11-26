import React , { useEffect } from 'react';
import Layout from '../components/Layout';
import LoginForm from '../components/User/Login';
import Router from 'next/router';
import axios from 'axios';
import { END } from 'redux-saga';
import { useSelector } from 'react-redux';
import { LOAD_MY_INFO_REQUEST } from '../actions/user';
import { CLOSE_ALERT } from '../actions/alert';
import wrapper from '../store/configureStore';


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

export const getServerSideProps = wrapper.getServerSideProps(async (context)=>{
    const cookie=context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie='';
    if(context.req && cookie){
        axios.defaults.headers.Cookie=cookie;
    }
    context.store.dispatch({type:LOAD_MY_INFO_REQUEST});
    context.store.dispatch(END);
    await context. store['sagaTask'].toPromise();
});

export default Login;