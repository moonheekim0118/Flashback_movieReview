import React , { useCallback , useRef,useState , useEffect } from 'react';
import shortid from 'shortid';
import useToggle from '../../../hooks/useToggle';
import Router from 'next/router';
import { useDispatch } from 'react-redux';
import MovieCard from '../../Movie/MovieCard';
import Button from '../../../atoms/Buttons';
import Icon from '../../../atoms/Icons';
import styled from 'styled-components';
import useValidation from '../../../hooks/useValidation';
import Badge from '../Badge';
import { faCheck , faTimes } from '@fortawesome/free-solid-svg-icons';
import { ADD_MY_REVIEW_REQUEST,UPDATE_MY_REVIEW_REQUEST } from '../../../actions/review';
import { ReviewList } from '../../../model/ReviewList';

interface Props {
    Review?:ReviewList;
    ButtonType:string;
}

const TextEditor=({Review , ButtonType}:Props)=>{
    const dispatch = useDispatch();
    const [ shortComment, setShortComment, shortCommentError ] = useValidation(Review.shortComment,5,20);
    const [ character, setCharacter, characterError ] = useValidation(Review.character,5,50);
    const [ line, setLine, lineError ] = useValidation(Review.line,5,50);
    const [ scene, setScene, sceneError ] = useValidation(Review.scene,5,50);
    const [ freeComment, setFreeComment ,freeCommentError ] = useValidation(Review.freeComment,0,50);

    const initialUpdate = useRef(true);
    const [initial, setInitial]=useState(true);
    
    // 수정 상태 시 원래 저장된 레이팅 
    const good = Review.rating==='GOOD' ? true : false;
    const soso = Review.rating==='SOSO' ? true : false;
    const bad = Review.rating==='BAD' ? true : false; 
    const [goodSelect,setGoodSelect,
           sosoSelect,setSoSoSelect,
           badSelect,setBadSelect]
         = useToggle(good, soso, bad);

    const PassedIcon=<Icon icon={faCheck} color={'green'}/>
    const ErrorIcon=<Icon icon={faTimes} color={'red'}/>


    useEffect(()=>{
        if(initialUpdate.current){
            initialUpdate.current=false;
            return;
        }
        else{
            setInitial(false);
        }
    },[initialUpdate.current]);

    const onCreate=useCallback(()=>{ // 저장

        let rating='BAD';
        if(goodSelect){
            rating='GOOD';
        }
        else if(sosoSelect){
            rating='SOSO'
        }
        dispatch({
            type:ADD_MY_REVIEW_REQUEST,
            data:{
                id:shortid.generate(),
                movieInfo:Review.movieInfo,
                rating:rating,
                shortComment:shortComment,
                character:character,
                line:line,
                scene:scene,
                freeComment:freeComment,
            }
        });
        // 저장 디스패치 보내주고
        // 라우터로 푸시해서 preview 페이지로 보내주기 
        Router.push(`/singleReview/${shortid.generate()}`);
    },[goodSelect,sosoSelect,badSelect,shortComment,character,line,scene,freeComment]);

    const onUpdate=useCallback(()=>{
        let rating='BAD';
        if(goodSelect){
            rating='GOOD';
        }
        else if(sosoSelect){
            rating='SOSO'
        }
        dispatch({
            type:UPDATE_MY_REVIEW_REQUEST,
            data:{
                id:Review.id,
                movieInfo:Review.movieInfo,
                rating:rating,
                shortComment:shortComment,
                line:line,
                character:character,
                scene:scene,
                freeComment:freeComment,
            }
        })
        Router.push(`/singleReview/${Review.id}`);
    },[]);

    const SubmitButton= ButtonType==='create' ?
    <Button
    color={"purple"}
    onClick={onCreate}
    title={"저장하기"}
    disabled={shortCommentError || characterError || lineError || sceneError || freeCommentError }
    /> : 
    <Button
    color={"purple"}
    onClick={onUpdate}
    title={"수정하기"}
    disabled={shortCommentError || characterError || lineError || sceneError || freeCommentError }
    /> ;

    return(
        <Container>
            <MovieCard Movie={Review.movieInfo}/>
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