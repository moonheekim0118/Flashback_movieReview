import React , { useEffect } from 'react';
import { useRouter }from 'next/router';
import { useDispatch,useSelector } from 'react-redux';
import { LOAD_SINGLE_REVIEW_REQUEST } from '../../actions/review';
import Layout from '../../components/Layout';
import SingleReviewComponent from '../../components/Review/SingleReview';

const singleReview=()=>{

    const router = useRouter();
    const dispatch = useDispatch();
    const { id } = router.query;
    const singleReview = useSelector(state=>state.review.singleReview);

    useEffect(()=>{
        dispatch({
            type:LOAD_SINGLE_REVIEW_REQUEST,
            data:id,
        });
    },[]);

    if(!singleReview) return (
        <Layout PageName="리뷰">
            <p>존재하지 않는 리뷰 입니다.</p>
        </Layout>
    )

    return(
        <Layout PageName={"리뷰"}>
            <SingleReviewComponent Review={singleReview}/>
        </Layout>
    );
}

export default singleReview;