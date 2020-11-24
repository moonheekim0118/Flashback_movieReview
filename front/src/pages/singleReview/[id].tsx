import React , { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch,useSelector } from 'react-redux';
import { LOAD_SINGLE_REVIEW_REQUEST } from '../../actions/review';
import Layout from '../../components/Layout';
import SingleReviewComponent from '../../components/Review/SingleReview';

const singleReview=()=>{

    const router = useRouter();
    const dispatch = useDispatch();
    const { id } = router.query;
    const singleReview = useSelector(state=>state.review.singleReview);

    // id 값이 불러와지면 서버에 요청 보내는 것으로 대체! -> 안그러면 404 에러남 
    // 서버사이드 렌더링하면 이부분은 없어도 된다.
    useEffect(()=>{
        if(id){
            dispatch({
                type:LOAD_SINGLE_REVIEW_REQUEST,
                data:id,
            });
        }
    },[id]);

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