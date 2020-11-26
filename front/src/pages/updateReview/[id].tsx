import React , { useEffect } from 'react';
import Router from 'next/router';
import Layout from '../../components/Layout';
import axios from 'axios';
import { END } from 'redux-saga';
import { LOAD_MY_INFO_REQUEST } from '../../actions/user';
import { LOAD_SINGLE_REVIEW_REQUEST } from '../../actions/review';
import { useSelector } from 'react-redux'
import { Message } from '../../components/GlobalStyle';
import TextEditor from '../../components/Review/TextEditor';
import wrapper from '../../store/configureStore';

const UpdateReview=()=>{
    const myInfo = useSelector((state)=>state.user.myInfo);
    const singleReview = useSelector((state)=>state.review.singleReview);
    
    useEffect(()=>{
        if(!myInfo){ // 로그인되지 않은 경우 리다이렉트 
            Router.replace('/login');
        }
    },[]);

    if(!singleReview) return(
        <Layout PageName="리뷰수정">
            <Message>리뷰가 존재하지 않습니다.</Message>
        </Layout>
    )
    return(
        <Layout PageName="리뷰수정">
            <TextEditor Review={singleReview} ButtonType={"update"}/>
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
    context.store.dispatch({
        type:LOAD_SINGLE_REVIEW_REQUEST,
        data:context.params.id,});
    context.store.dispatch(END);
    await context. store['sagaTask'].toPromise();
});


export default UpdateReview;