import React , { useEffect } from 'react';
import Layout from '../components/Layout';
import Router from 'next/router';
import { useSelector } from 'react-redux';
import SearchMovie from '../components/Movie/SearchMovie';

const searchMovie=()=>{

    const loginDone = useSelector(state=>state.user.loginDone);
    
    // useEffect(()=>{ // 로그인 안되어있으면 메인페이지로 푸시 
    //     if(!loginDone){
    //         Router.push('/');
    //     }
    // },[loginDone]);

    return(
        <Layout PageName={"영화 검색"}>
           <SearchMovie/>
        </Layout>
    );
}

export default searchMovie;