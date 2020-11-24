import React , { useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { LOAD_SINGLE_REVIEW_REQUEST } from '../../actions/review';
import { useDispatch,useSelector } from 'react-redux'
import TextEditor from '../../components/Review/TextEditor';

const UpdateReview=()=>{
    const router = useRouter();
    const dispatch = useDispatch();
    const { id } = router.query;
    const myInfo = useSelector((state)=>state.user.myInfo);
    const singleReview = useSelector((state)=>state.review.singleReview);
    
    useEffect(()=>{
        if(!myInfo){ // 로그인되지 않은 경우 리다이렉트 
            Router.replace('/login');
        }
        else{
            dispatch({
                type:LOAD_SINGLE_REVIEW_REQUEST,
                data:id,
            });
        }
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