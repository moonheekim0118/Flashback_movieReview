import React , { useCallback } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import useInput from '../../../hooks/useInput';
import styled from 'styled-components';
import Icon from '../../../atoms/Icons';
import { LOAD_RELATED_SEARCH_REQUEST } from '../../../actions/movie';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { debounce } from 'lodash';

// 검색창
// 연관검색어 구현하기

// 검색창에서 검색 누르면 --> Movie/[movieTitle] 페이지로 넘어간다
// Movie/[movieTitle] 페이지에서는 인피니트 스크롤링 구현 

const SearchMovie=()=>{

    const dispatch = useDispatch();
    
    const [SearchInput, setSearchInput]=useInput('');
    const { loadRelatedSearchLoading } = useSelector(state=>state.movie);

    const onChnageInput=useCallback((e)=>{
        setSearchInput(e);
        sendRequest(e.target.value);
    },[]);

    const sendRequest = debounce((value)=>{
        dispatch({ 
            type:LOAD_RELATED_SEARCH_REQUEST,
            data:value
        })
    },900);

    const onSearch = useCallback(()=>{
        
    },[]);

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
                    />
                </SearchIcon>
            </SearchContainer>
        </Container>
    );
}

const Container = styled.div`
    position:relative;
    display:flex;
    flex-direction:column;
    align-items:center;
    margin:15px auto;
    
`;

const SearchContainer = styled.div`
    width:80%;
    position:relative;
`;

const SearchBox = styled.input.attrs({type:'text'})`
    width:100%;
    padding: 15px 20px;

    border:3px solid #e6b3cc;
    border-radius:25px;
    font-size:1.2rem;

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
export default SearchMovie;