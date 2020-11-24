import React , { useEffect } from 'react';
import Router from 'next/router';
import Layout from '../components/Layout';
import { useSelector , useDispatch } from 'react-redux';
import { LOAD_MY_REVIEWS_REQUEST } from '../actions/review';
import Preview from '../components/Review/Preview';

const MyReviews=()=>{
    const dispatch = useDispatch();
    const loginDone = useSelector(state=>state.user.loginDone);
    const { myReviews }  = useSelector(state=>state.review);

    useEffect(()=>{
        if(!loginDone){ // 로그인 안되어있는 경우 리다이렉트 
            Router.replace('/login');
        }
        else { 
            dispatch({type:LOAD_MY_REVIEWS_REQUEST}); 
        }
    },[]);

    return(
        <Layout PageName="내가 작성한 리뷰">
            {myReviews && myReviews.map((v)=>(<Preview Review={v}/>))}
        </Layout>
    );
}

export default MyReviews;