import React , { useCallback , useRef,useState , useEffect } from 'react';
import Router from 'next/router';
import { useDispatch } from 'react-redux';
import MovieCard from '../../Movie/MovieCard';
import { MovieList } from '../../../model/MovieList';
import Button from '../../../atoms/Buttons';
import Icon from '../../../atoms/Icons';
import styled from 'styled-components';
import useValidation from '../../../hooks/useValidation';
import Badge from '../Badge';
import { faCheck , faTimes } from '@fortawesome/free-solid-svg-icons';

interface Props {
    Movie?:MovieList;
}

const TextEditor=({Movie}:Props)=>{
    const dispatch = useDispatch();
    const [ shortComment, setShortComment, shortCommentError ] = useValidation("",5,20);
    const [ character, setCharacter, characterError ] = useValidation("",5,50);
    const [ line, setLine, lineError ] = useValidation("",5,50);
    const [ scene, setScene, sceneError ] = useValidation("",5,50);
    const [ freeComment, setFreeComment ,freeCommentError ] = useValidation("",0,50);

    const initialUpdate = useRef(true);
    const [initial, setInitial]=useState(true);
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
    const onSave=useCallback(()=>{ // 저장

        // 저장 디스패치 보내주고
        // 라우터로 푸시해서 preview 페이지로 보내주기 

    },[]);

    // length 가  0 이상이고, Erorr가 없으면 check 마크 달아주기
    // 아니면 Error마크 달아주기 
    return(
        <Container>
            <MovieCard Movie={Movie}/>
            <BadgeContainer>
                <Badge badgeName={"GOOD"}/>
                <Badge badgeName={"SOSO"}/>
                <Badge badgeName={"BAD"}/>
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
            <Button
            color={"purple"}
            onClick={onSave}
            title={"저장하기"}
            disabled={shortCommentError || characterError || lineError || sceneError || freeCommentError }
            />
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