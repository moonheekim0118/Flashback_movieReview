import React , { useEffect } from 'react';
import Router from 'next/router';
import Layout from '../components/Layout';
import { useSelector , useDispatch } from 'react-redux';
import { openAlertAction } from '../actions/alert';
import { loadMyReviewsAction } from '../actions/review';
import { LOAD_MY_INFO_REQUEST } from '../actions/user';
import { END } from 'redux-saga';
import { Message } from '../components/GlobalStyle';
import axios from 'axios';
import Preview from '../components/Review/Preview';
import wrapper from '../store/configureStore';


const MyReviews=()=>{
    const dispatch = useDispatch();
    const loginDone = useSelector(state=>state.user.loginDone);
    const { myReviews,
            hasMoreReviews,
            loadMyReviewsLoading,
            removeMyReviewDone,
            removeMyReviewError
           }  
            = useSelector(state=>state.review);

    useEffect(()=>{
        if(!loginDone){ // 로그인 안되어있는 경우 리다이렉트 
            Router.replace('/login');
        }
        else{
            dispatch(loadMyReviewsAction(0));
        }
    },[]);

    useEffect(()=>{
        // 인피니트 스크롤링 
        function onScroll(){
            if(window.pageYOffset + document.documentElement.clientHeight+10>=document.documentElement.scrollHeight){
                if(hasMoreReviews && !loadMyReviewsLoading){
                    const lastId = myReviews[myReviews.length-1].id; // 다음 스타트 지점 id
                    dispatch(loadMyReviewsAction(lastId))
                }
            }
        }
        window.addEventListener('scroll',onScroll);
        return()=>{
            window.removeEventListener('scroll',onScroll);
        }
    },[loadMyReviewsLoading,hasMoreReviews,myReviews]);

    useEffect(()=>{ // 삭제 후 alert 
        if(removeMyReviewDone){  // 삭제 완료시 alert 
            dispatch(openAlertAction('리뷰가 삭제되었습니다.'));
        }
        else if(removeMyReviewError){ // 삭제 시 문제 발생 alert 
            dispatch(openAlertAction(removeMyReviewError));
        }
    },[removeMyReviewDone,removeMyReviewError]);

    if(myReviews.length===0){ // 리뷰가 없는 경우 
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


export default MyReviews;