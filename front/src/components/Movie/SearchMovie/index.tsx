import React , { useCallback } from 'react';
import Router from 'next/router';
import { useDispatch , useSelector } from 'react-redux';
import useInput from '../../../hooks/useInput';
import styled from 'styled-components';
import Icon from '../../../atoms/Icons';
import { LOAD_RELATED_SEARCH_REQUEST } from '../../../actions/movie';
import { faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { debounce } from 'lodash';
import { titleParser } from '../../../util/titleParser';
import SearchResult from '../SearchResult';

const SearchMovie=()=>{

    const dispatch = useDispatch();
    
    const [SearchInput, setSearchInput]=useInput('');
    const { loadRelatedSearchLoading , loadRelatedSearchDone, searchLists } = useSelector(state=>state.movie);

    const onClickSearch=useCallback(()=>{
        Router.push(`/movieResult/${SearchInput}`);
    },[SearchInput]);

    const onChnageInput=useCallback((e)=>{
        setSearchInput(e);
        if(e.target.value.length>1){
            sendRequest(e.target.value);
        }
    },[]);

    const sendRequest = debounce((value)=>{
        dispatch({ 
            type:LOAD_RELATED_SEARCH_REQUEST,
            data:value
        })
    },900);

    return(
        <Container>
            <SearchContainer>
                <SearchBox
                placeholder="영화 제목을 입력하세요"
                value={SearchInput}
                onChange={onChnageInput}
                />
                <SearchIcon>
                <Icon
                size={30}
                icon={faSearch}
                className={"faSearch"}
                onClick={onClickSearch}
                />
                </SearchIcon>
            </SearchContainer>
            {loadRelatedSearchLoading  && <Icon icon={faSpinner} className={"faSpinner"}/>}
            <SearchResultContainer>
                {loadRelatedSearchDone && SearchInput.length>0 &&
                searchLists.map((val)=>
                <SearchResult
                key={val.link} 
                movieName={titleParser(val.title)}/>)}
            </SearchResultContainer>
        </Container>
    );
}

const Container = styled.div`
    position:relative;
    display:flex;
    flex-direction:column;
    align-items:center;
    margin:15px auto;

    background-color:inherit;
    font-color:inherit;
    
`;

const SearchContainer = styled.div`
    width:80%;
    position:relative;
    margin-bottom:15px;
`;

const SearchBox = styled.input.attrs({type:'text'})`
    width:100%;
    padding: 15px 20px;

    border:3px solid #e6b3cc;
    border-radius:25px;
    font-size:1.2rem;

    background-color:inherit;
    color:inherit;

    box-shadow:0px 0px 10px -1px rgba(230, 179, 204,0.75);
`;

const SearchIcon = styled.div`
    position:absolute;
    right:15px;
    top:50%;

    display:flex;
    justify-content:center;
    align-items:center;

    transform:translateY(-50%);
    border-radius:50%;
    color:#cc00cc;
    
    width:50px;
    height:50px;

    transition: 0.2s background-color ease-in-out;
    cursor:pointer;

    &:hover{
        background-color:rgba(230, 179, 204,0.4);
    }
`;

const SearchResultContainer=styled.div`
    width:80%;
    border-radius:5px;
    
`;
export default SearchMovie;