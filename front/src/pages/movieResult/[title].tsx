import React , { useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useDispatch,useSelector } from 'react-redux';
import { INIT_MOVIES,LOAD_MOVIES_REQUEST } from '../../actions/movie';
import MovieCard from '../../components/Movie/MovieCard';
import styled from 'styled-components';

const movieResult=()=>{
    const dispatch = useDispatch();
    const router = useRouter();
    const { title } = router.query;
    const { movieLists,loadMoviesLoading,hasMoreMovies } = useSelector((state)=>state.movie);

    useEffect(()=>{
        dispatch({ type:INIT_MOVIES }); // 영화리스트 초기화해서 이전에 남아있던 기록 삭제 
        dispatch({
            type:LOAD_MOVIES_REQUEST,
            data:{title:title, start:1}
        })
    },[]);

    useEffect(()=>{
        // 인피니트 스크롤링
        function onScroll(){
            if(window.pageYOffset + document.documentElement.clientHeight+10>=document.documentElement.scrollHeight){
                if(hasMoreMovies && !loadMoviesLoading){
                    const start = movieLists.length+1; // 다음 스타트 지점
                    dispatch({
                        type:LOAD_MOVIES_REQUEST,
                        data:{title:title, start:start}
                    })
                }
            }
        }
        window.addEventListener('scroll',onScroll);
        return()=>{
            window.removeEventListener('scroll',onScroll);
        }
    },[hasMoreMovies,loadMoviesLoading,movieLists]);
    
    return(
        <Layout PageName={`${title} 검색결과`}>
            {movieLists&&movieLists.map((v,i)=>(
                <MovieCard key={v.link} Movie={v} Search={true}/>
            ))}
            {movieLists.length===0 && <Message>{`${title} 검색결과가 없습니다!`}</Message>}
        </Layout>
    );
}

export const Message = styled.div`
    text-align:center;
    margin-top:50px;
`;

export default movieResult;