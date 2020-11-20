import React , { useEffect } from 'react';
import Router from 'next/router';
import { useSelector } from 'react-redux';
import Layout from '../components/Layout';
import SingleReviewComponent from '../components/Review/SingleReview';

const singleReview=()=>{

    const singleReview = useSelector(state=>state.review.singleReview);

    useEffect(()=>{
        if(!singleReview) {
            Router.push('/');
        }
    },[]);

    return(
        <Layout PageName={"리뷰"}>
            <SingleReviewComponent Review={singleReview}/>
        </Layout>
    );
}

export default singleReview;