import React , { useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { LOAD_SINGLE_MOVIE_REQUEST } from '../../actions/movie';
import { LOAD_MY_INFO_REQUEST } from '../../actions/user';
import { useDispatch,useSelector } from 'react-redux'
import TextEditor from '../../components/Review/TextEditor';

const WriteReview=()=>{
    // 로그인 정보 확인 추가 필수 
    const router = useRouter();
    const dispatch = useDispatch();
    const { id } = router.query;
    const singleMovie = useSelector((state)=>state.movie.singleMovie);
    const myInfo = useSelector((state)=>state.user.myInfo);
    
    useEffect(()=>{
        dispatch({
            type:LOAD_SINGLE_MOVIE_REQUEST,
            data:id,
        });
        dispatch({
            type:LOAD_MY_INFO_REQUEST
        });
    },[]);

    if(!singleMovie) return(
        <Layout PageName="리뷰작성">
            <p>존재하지 않는 영화입니다.</p>
        </Layout>
    )
    return(
        <Layout PageName="리뷰작성">
            <TextEditor 
            Review={{id:null, movieInfo:singleMovie, 
                author:myInfo,
                shortComment:"", line:"", character:"", scene:"", freeComment:"", rating:"GOOD"}}
            ButtonType={"create"}
            />
        </Layout>
    );
}

export default WriteReview;