import React , { useEffect } from 'react';
import Router from 'next/router';
import Layout from '../components/Layout';
import { useSelector , useDispatch } from 'react-redux';
import { LOAD_MY_REVIEWS_REQUEST , INIT_REVIEWS} from '../actions/review';
import Preview from '../components/Review/Preview';
import { Message } from './movieResult/[title]';

const MyReviews=()=>{
    const dispatch = useDispatch();
    const loginDone = useSelector(state=>state.user.loginDone);
    const { myReviews, hasMoreReviews,loadMyReviewsLoading }  = useSelector(state=>state.review);

    useEffect(()=>{
        // 기존에 남아있던 리뷰 초기화 
        dispatch({type:INIT_REVIEWS});
        if(!loginDone){ // 로그인 안되어있는 경우 리다이렉트 
            Router.replace('/login');
        }
        else { 
            // 첫 로딩 
            dispatch({type:LOAD_MY_REVIEWS_REQUEST, data:0}); 
        }
    },[]);

    useEffect(()=>{
        // 인피니트 스크롤링 
        function onScroll(){
            if(window.pageYOffset + document.documentElement.clientHeight+10>=document.documentElement.scrollHeight){
                if(hasMoreReviews && !loadMyReviewsLoading){
                    const lastId = myReviews[myReviews.length-1].id; // 다음 스타트 지점 id
                    dispatch({
                        type:LOAD_MY_REVIEWS_REQUEST,
                        data:lastId
                    })
                }
            }
        }
        window.addEventListener('scroll',onScroll);
        return()=>{
            window.removeEventListener('scroll',onScroll);
        }
    },[loadMyReviewsLoading,hasMoreReviews,myReviews]);

    if(!myReviews){
        return(
        <Layout PageName="내가 작성한 리뷰">
            <Message>리뷰가 아직 없습니다.</Message>
        </Layout>
        );
    }
    return(
        <Layout PageName="내가 작성한 리뷰">
            {myReviews && myReviews.map((v)=>(<Preview key={v.id} Review={v}/>))}
        </Layout>
    );
}

export default MyReviews;