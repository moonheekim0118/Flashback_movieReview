import React , { 
       useCallback , 
       useRef, 
       useState , 
       useEffect 
} from 'react';
import useToggle from '../../../hooks/useSelecting';
import Router from 'next/router';
import { useDispatch , useSelector } from 'react-redux';
import MovieCard from '../../Movie/MovieCard';
import Button from '../../../atoms/Buttons';
import Icon from '../../../atoms/Icons';
import styled from 'styled-components';
import useValidation from '../../../hooks/useValidation';
import Badge from '../Badge';
import { faCheck , faTimes } from '@fortawesome/free-solid-svg-icons';
import { ADD_MY_REVIEW_REQUEST, UPDATE_MY_REVIEW_REQUEST,} from '../../../actions/review';
import { OPEN_ALERT } from '../../../actions/alert';
import { ReviewList } from '../../../model/ReviewList';

interface Props {
    Review?:ReviewList;
    ButtonType:string;
}

const TextEditor=({Review , ButtonType}:Props)=>{
    const dispatch = useDispatch();

    // 아이콘 
    const PassedIcon=<Icon icon={faCheck} color={'green'}/>
    const ErrorIcon=<Icon icon={faTimes} color={'red'}/>

    const [ shortComment,  // 짧은 평 
            setShortComment, 
            shortCommentError 
        ] = useValidation(Review.shortComment,5,20);

    const [ character,  // 기억에 남는 캐릭터 
            setCharacter, 
            characterError 
        ] = useValidation(Review.character,5,50);

    const [ line,  // 기억에 남는 대사 
            setLine, 
            lineError 
        ] = useValidation(Review.line,5,50);

    const [ scene,  // 기억에 남는 장면 
            setScene, 
            sceneError 
        ] = useValidation(Review.scene,5,50);
        
    const [ freeComment, // 자유 커멘트 
            setFreeComment,
            freeCommentError 
        ] = useValidation(Review.freeComment,0,50);

    const initialUpdate = useRef(true);// 최초 렌더링인지 구분하기 위함 
    const [initial, setInitial]=useState(true); // 최초 렌더링인지 구분하기 위함 
    
    // 수정 상태 시 원래 저장된 레이팅으로 상태 설정
    const good = Review.rating==='GOOD' ? true : false;
    const soso = Review.rating==='SOSO' ? true : false;
    const bad = Review.rating==='BAD' ? true : false; 

    const [goodSelect,setGoodSelect,
           sosoSelect,setSoSoSelect,
           badSelect,setBadSelect]
         = useToggle(good, soso, bad);

    const { myReviews ,
            addMyReviewDone, 
            addMyReviewError, 
            updateMyReviewDone, 
            updateMyReviewError } 
            = useSelector((state)=>state.review);

    useEffect(()=>{ // 초기 상태라면 validation 에러 띄워주지 않음 
        if(initialUpdate.current){
            initialUpdate.current=false;
            return;
        }
        else{
            setInitial(false);
        }
    },[initialUpdate.current]);

    useEffect(()=>{ // 리뷰 생성 후 alert 보여준 후 리다이렉트 
        if(addMyReviewDone){
            dispatch({type:OPEN_ALERT,data:"리뷰가 등록되었습니다."}); // open alert 
            const  timer = setTimeout(()=> Router.replace(`/singleReview/${myReviews[0].id}`),5000); // 리다이렉트
            return ()=>clearTimeout(timer);
        }
        else if(addMyReviewError){ // 에러 발생 시 에러 메시지 띄워줌 
            dispatch({type:OPEN_ALERT,data:addMyReviewError});
        }
    },[addMyReviewDone,addMyReviewError]);

    useEffect(()=>{ // 리뷰 수정 후 alert 보여준 후 리다이렉트
        if(updateMyReviewDone){
            dispatch({type:OPEN_ALERT,data:"리뷰가 수정되었습니다."});
            const timer = setTimeout(()=>Router.replace(`/singleReview/${Review.id}`),5000);
            return ()=>clearTimeout(timer);
        }
        else if(updateMyReviewError){ // 에러 발생시 에러 메시지 띄워줌 
            dispatch({type:OPEN_ALERT,data:updateMyReviewError});
        }
    },[updateMyReviewDone,updateMyReviewError]);

    const onCreate=useCallback(()=>{ // 리뷰 저장
        let rating='BAD'; // 레이팅 설정 
        if(goodSelect){
            rating='GOOD';
        } else if(sosoSelect){
            rating='SOSO'
        }
        dispatch({
            type:ADD_MY_REVIEW_REQUEST,
            data:{
                Movie:Review.Movie,
                rating:rating,
                shortComment:shortComment,
                character:character,
                line:line,
                scene:scene,
                freeComment:freeComment,
            }
        });
    },[goodSelect,sosoSelect,badSelect,shortComment,character,line,scene,freeComment]);

    const onUpdate=useCallback(()=>{ // 리뷰 수정 
        let rating='BAD';
        if(goodSelect){
            rating='GOOD';
        } else if(sosoSelect){
            rating='SOSO'
        }
        dispatch({
            type:UPDATE_MY_REVIEW_REQUEST,
            data:{
                id:Review.id,
                User:Review.User,
                Movie:Review.Movie,
                rating:rating,
                shortComment:shortComment,
                line:line,
                character:character,
                scene:scene,
                freeComment:freeComment,
            }
        })
    },[goodSelect,sosoSelect,badSelect,shortComment,character,line,scene,freeComment]);

    // 버튼 disabeld 공통 조건 
    const disabledRequirements= 
    shortCommentError||characterError||lineError||sceneError||freeCommentError||shortComment.length===0||
    character.length===0||line.length===0|| scene.length===0; 

    // 업데이트 버튼 disabeld 조건 
    const updateDisabledRequirements=
    shortComment===Review.shortComment && freeComment===Review.freeComment && 
    character===Review.character && line===Review.line && scene===Review.scene ; 
    const SubmitButton= ButtonType==='create' ?
    <Button
    color={"purple"}
    onClick={onCreate}
    title={"저장하기"}
    disabled={disabledRequirements }
    /> : 
    <Button
    color={"purple"}
    onClick={onUpdate}
    title={"수정하기"}
    disabled={disabledRequirements || updateDisabledRequirements}
    /> ;

    return(
        <Container>
            <MovieCard Movie={Review.Movie}/>
            <BadgeContainer>
                <Badge badgeName={"GOOD"} selected={goodSelect} onClick={setGoodSelect}/>
                <Badge badgeName={"SOSO"} selected={sosoSelect} onClick={setSoSoSelect}/>
                <Badge badgeName={"BAD"} selected={badSelect} onClick={setBadSelect} />
            </BadgeContainer>
            <TextContainer>
                <Question htmlFor="shortComment">
                    한 줄평
                </Question>
                {shortCommentError && ErrorIcon}
                {!shortCommentError && !initial && shortComment.length >0 && PassedIcon}
                <TextInput 
                value={shortComment}
                onChange={setShortComment}
                name="shortComment"
                />
                <Question htmlFor="character"> 
                    기억에 남는 인물과 이유를 적어주세요
                </Question>
                {characterError && ErrorIcon}
                {!characterError && !initial && character.length>0 && PassedIcon}
                <TextInput
                value={character}
                onChange={setCharacter}
                name="character"
                />
                <Question htmlFor="line">
                    기억에 남는 대사와 이유를 적어주세요
                </Question>
                {lineError && ErrorIcon}
                {!lineError && !initial && line.length > 0 && PassedIcon}
                <TextInput
                value={line}
                onChange={setLine}
                name="line"
                />
                <Question htmlFor="scene">
                    기억에 남는 장면과 이유를 적어주세요
                </Question>
                {sceneError && ErrorIcon}
                {!sceneError && !initial && scene.length > 0 && PassedIcon}
                <TextInput
                value={scene}
                onChange={setScene}
                name="scene"
                />
                <Question htmlFor="freeComment">
                    영화에 대한 자유로운 메모 
                </Question>
                {freeCommentError && ErrorIcon}
                {!freeCommentError && !initial && freeComment.length>0 && PassedIcon}
                <TextInput
                value={freeComment}
                onChange={setFreeComment}
                name="freeComment"
                />
            </TextContainer>
            <ButtonWrapper>
                {SubmitButton}
            </ButtonWrapper>
        </Container>
    );
}

const Container = styled.div`
    width:80%;
    margin:auto;
    background-color:inherit;
`;
const Question = styled.label`
    font-size:1.5rem;
    font-weight:bold;
`;

const TextContainer=styled.div`
    margin-top:20px;
`;

const TextInput = styled.input.attrs({type:'text'})`
    width:100%;
    padding: 10px 15px;
    font-size:1.2rem;
    border:none;
    border-bottom:3px solid #e6b3cc;
    border-top-left-radius:5px;
    border-top-right-radius:5px;
    margin: 15px 0  40px 0; 
    
    transition: 0.2s background-color ease-in-out;
    background-color:inherit;
    color:inherit;

    &:focus{
        background-color:rgba(230, 179, 204,0.3);
    }
`;

const ButtonWrapper = styled.div`
    text-align:center;
`;

const BadgeContainer = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:space-evenly;
    align-items:center;

    margin-top:20px;
`;

export default TextEditor;