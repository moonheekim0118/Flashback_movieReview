import React from 'react';
import Layout from '../components/Layout';
import SearchMovie from '../components/Movie/SearchMovie';
import { loadFavoriteMovieAction } from '../actions/user';
import { END } from 'redux-saga';
import axios from 'axios';
import wrapper from '../store/configureStore';

const searchMovie=()=>{

    return(
        <Layout PageName={"영화 검색"}>
           <SearchMovie/>
        </Layout>
    );
}

export const getServerSideProps = wrapper.getServerSideProps(async (context)=>{
    const cookie=context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie='';
    if(context.req && cookie){
        axios.defaults.headers.Cookie=cookie;
    }
    context.store.dispatch(loadFavoriteMovieAction());
    context.store.dispatch(END);
    await context. store['sagaTask'].toPromise();
});

export default searchMovie;