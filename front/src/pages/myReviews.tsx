import React , { useEffect } from 'react';
import Layout from '../components/Layout';
import { useSelector , useDispatch } from 'react-redux';
import { LOAD_MY_REVIEWS_REQUEST } from '../actions/review';
import Preview from '../components/Review/Preview';

const MyReviews=()=>{
    const dispatch = useDispatch();
    const loginDone = useSelector(state=>state.user.loginDone);
    const { myReviews }  = useSelector(state=>state.review);
    useEffect(()=>{
        // if(!loginDone){
        //     Router.push('/');
        // }
    },[loginDone]);

    useEffect(()=>{
        dispatch({type:LOAD_MY_REVIEWS_REQUEST});
    },[]);

    return(
        <Layout PageName="내가 작성한 리뷰">
            {myReviews && myReviews.map((v)=>(<Preview Review={v}/>))}
        </Layout>
    );
}

export default MyReviews;