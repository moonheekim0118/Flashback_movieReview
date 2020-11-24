import React , { useEffect } from 'react';
import Router from 'next/router';
import Layout from '../components/Layout';
import { LOAD_MY_INFO_REQUEST } from '../actions/user';
import { useDispatch,useSelector } from 'react-redux'
import TextEditor from '../components/Review/TextEditor';

const WriteReview=()=>{
    // 로그인 정보 확인 추가 필수 
    const dispatch = useDispatch();
    const singleMovie = useSelector((state)=>state.movie.singleMovie);
    const myInfo = useSelector((state)=>state.user.myInfo);
    
    const base = {id:null, movieInfo:singleMovie, author:myInfo,
        shortComment:"", line:"", character:"", scene:"", freeComment:"", rating:"GOOD"};

    useEffect(()=>{
        dispatch({
            type:LOAD_MY_INFO_REQUEST
        });

        // 새로고침 시 영화 정보가 사라지므로, 경고창을 띄운다.
        function leaveAlert(event){  // 새로고침 누를 시 뜨는 경고 
            event.returnValue = `변경사항이 저장되지 않습니다.`;
        };

        window.addEventListener('beforeunload',leaveAlert); //새로고침 이벤트   

        return()=>{
            window.removeEventListener('beforeunload',leaveAlert);
        }
    },[]);

    // 영화 정보가 사라져있다면 이전 페이지로 돌려보낸다.
    useEffect(()=>{
        if(!singleMovie){
            Router.back();
        }
    },[singleMovie]);

    if(!singleMovie){
        return(
            <Layout PageName="리뷰작성">
            </Layout>
        );
    }
    return(
        <Layout PageName="리뷰작성">
            <TextEditor 
            Review={base}
            ButtonType={"create"}
            />
        </Layout>
    );
}

export default WriteReview;