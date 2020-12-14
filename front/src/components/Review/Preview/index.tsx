import React , { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Router from 'next/router';
import styled from 'styled-components';
import Badge from '../Badge';
import Icon from '../../../atoms/Icons';
import ConfirmAlert from '../../ConfirmAlert';
import useAlert from '../../../hooks/useAlert';
import { removeMyReviewAction } from '../../../actions/review';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ReviewList } from '../../../model/ReviewList';
import { Container, 
         MoviePoster,
         MovieDescription 
} from '../../Movie/MovieCard';

interface Props {
    Review:ReviewList; 
}

// 영화 리뷰 미리보기 컴포넌트 
const Preview =({Review}:Props)=>{
    const dispatch = useDispatch();
    
    const [ showConfirmAlert, 
            openConfirmAlert, 
            closeConfirmAlert 
        ] = useAlert();
    
    // 프리뷰 클릭시 해당 리뷰보기 창으로 리다이렉트 
    const onMove = useCallback(()=>{
        Router.push(`/singleReview/${Review.id}`);
    },[]);

    //리뷰 삭제 아이콘 클릭시, confirmAlert 띄워줌 
    const openRemoveAlert = useCallback((e)=>{ // alert 띄워주기 
        e.stopPropagation();
        openConfirmAlert();
    },[]);

    // confirmAlert 닫아줌 
    const closeRemoveAlert = useCallback((e)=>{ // alert 닫아주기 
        e.stopPropagation();
        closeConfirmAlert();
    },[]);

    // 리뷰 삭제 
    const onClickRemove = useCallback((e)=>{ // 리뷰 삭제 
        e.stopPropagation(); 
        dispatch(removeMyReviewAction(Review.id));
        closeConfirmAlert(); // confirmAlert 닫아줌 
    },[]);

    return(
        <Container onClick={onMove}>
            {showConfirmAlert && 
            <ConfirmAlert 
            text="정말 삭제하시겠습니까?"
            clickYes={onClickRemove} 
            clickNo={closeRemoveAlert}/>}
            <MoviePoster src={Review.Movie.image}/>
            <MovieDescription>
                <Comment>{Review.shortComment}</Comment>
                <Badge badgeName={Review.rating} selected={true}/>
            </MovieDescription>
            <Icon icon={faTrash} className="faTrash" onClick={openRemoveAlert}/>
        </Container>
    );
}

const Comment = styled.div`
    font-size:1.5rem;
    font-weight:bold;
`;

export default Preview;