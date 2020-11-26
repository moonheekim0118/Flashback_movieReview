import React , { useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useDispatch,useSelector } from 'react-redux';
import { LOAD_MY_INFO_REQUEST } from '../../actions/user';
import { LOAD_MOVIES_REQUEST } from '../../actions/movie';
import { Message } from '../../components/GlobalStyle';
import MovieCard from '../../components/Movie/MovieCard';
import axios from 'axios';
import { END } from 'redux-saga';
import wrapper from '../../store/configureStore';

const movieResult=()=>{
    const dispatch = useDispatch();
    const router = useRouter();
    const { title } = router.query;
    const { movieLists,loadMoviesLoading,hasMoreMovies } = useSelector((state)=>state.movie);

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

export const getServerSideProps = wrapper.getServerSideProps(async (context)=>{
    const cookie=context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie='';
    if(context.req && cookie){
        axios.defaults.headers.Cookie=cookie;
    }
    context.store.dispatch({type:LOAD_MY_INFO_REQUEST});
    context.store.dispatch({
        type:LOAD_MOVIES_REQUEST,
        data:{title:context.params.title,start:1}
    })
    context.store.dispatch(END);
    await context.store['sagaTask'].toPromise();
});


export default movieResult;