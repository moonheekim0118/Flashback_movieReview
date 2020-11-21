import React , { useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { LOAD_SINGLE_REVIEW_REQUEST } from '../../actions/review';
import { useDispatch,useSelector } from 'react-redux'
import TextEditor from '../../components/Review/TextEditor';

const UpdateReview=()=>{
    // 로그인 정보 확인 추가 필수, author랑 로그인된 유저랑 같은지 확인 필수

    const router = useRouter();
    const dispatch = useDispatch();
    const { id } = router.query;
    const singleReview = useSelector((state)=>state.review.singleReview);
    
    useEffect(()=>{
        dispatch({
            type:LOAD_SINGLE_REVIEW_REQUEST,
            data:id,
        });
    },[]);

    if(!singleReview) return(
        <Layout PageName="리뷰수정">
            <p>리뷰가 존재하지 않습니다.</p>
        </Layout>
    )
    return(
        <Layout PageName="리뷰수정">
            <TextEditor Review={singleReview} ButtonType={"update"}/>
        </Layout>
    );
}

export default UpdateReview;