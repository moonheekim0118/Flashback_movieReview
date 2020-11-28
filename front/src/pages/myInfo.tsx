import React , { useEffect } from 'react';
import Router from 'next/router';
import Layout from '../components/Layout';
import { LOAD_MY_INFO_REQUEST, LOAD_FAVORITE_MOVIE_REQUEST } from '../actions/user';
import { useSelector } from 'react-redux'
import { Message } from '../components/GlobalStyle';
import { END } from 'redux-saga';
import axios from 'axios';
import wrapper from '../store/configureStore';
import Info from '../components/User/Info';

const User=()=>{
    const { myInfo, loginDone } = useSelector((state)=>state.user);

    useEffect(()=>{
        if(!loginDone){ // 로그인 안되어있는 경우 
            Router.replace('/login');
        }
    },[]);
    
    if(!myInfo){
        return(
            <Layout PageName="내 정보">
               <Message>다시 로그인 해주세요.</Message>
            </Layout>
        )
    }
    return(
        <Layout PageName="내 정보">
            <Info myInfo={myInfo}/>
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
    context.store.dispatch({type:LOAD_FAVORITE_MOVIE_REQUEST});
    context.store.dispatch(END);
    await context. store['sagaTask'].toPromise();
});

export default User;