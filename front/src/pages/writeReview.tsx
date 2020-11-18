import React , { useEffect } from 'react';
import Router from 'next/router';
import Layout from '../components/Layout';
import { useSelector } from 'react-redux'
import TextEditor from '../components/Review/TextEditor';

const WriteReview=()=>{
    // 로그인 정보 확인 추가 필수 
    const { singleMovie } = useSelector((state)=>state.movie);
    
    useEffect(()=>{
        if(!singleMovie) {
            Router.push('/');
        }
    },[]);

    if(!singleMovie){
        return<></>
    }

    return(
        <Layout PageName="리뷰작성">
            <TextEditor Movie={singleMovie}/>
        </Layout>
    );
}

export default WriteReview;