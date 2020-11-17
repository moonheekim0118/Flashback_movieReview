import React , { useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useDispatch,useSelector } from 'react-redux';
import { LOAD_MOVIES_REQUEST } from '../../actions/movie';
import MovieCard from '../../components/Movie/MovieCard';

const searchResult=()=>{
    const dispatch = useDispatch();
    const router = useRouter();
    const { movieNm } = router.query;
    const { movieLists } = useSelector((state)=>state.movie);

    useEffect(()=>{
        dispatch({
            type:LOAD_MOVIES_REQUEST,
            data:movieNm
        })
    },[]);
    
    return(
        <Layout PageName={`${movieNm} 검색결과`}>
            {movieLists && movieLists.map((v,i)=>(
                <MovieCard key={v.id} Movie={v}/>
            ))}
        </Layout>
    );
}

export default searchResult;