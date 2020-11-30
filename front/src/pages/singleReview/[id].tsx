import React from 'react';
import { useSelector } from 'react-redux';
import { LOAD_MY_INFO_REQUEST } from '../../actions/user';
import { LOAD_SINGLE_REVIEW_REQUEST } from '../../actions/review';
import { END } from 'redux-saga';
import { Message } from '../../components/GlobalStyle';
import axios from 'axios';
import Layout from '../../components/Layout';
import SingleReviewComponent from '../../components/Review/SingleReview';
import wrapper from '../../store/configureStore';


const singleReview=()=>{

    const singleReview = useSelector(state=>state.review.singleReview);
    const myInfo = useSelector(state=>state.user.myInfo);

    if(!singleReview) return (
        <Layout PageName="리뷰">
            <Message>존재하지 않는 리뷰 입니다.</Message>
        </Layout>
    )

    return(
        <Layout PageName={"리뷰"}>
            <SingleReviewComponent Review={singleReview} myInfo={myInfo}/>
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


export default singleReview;