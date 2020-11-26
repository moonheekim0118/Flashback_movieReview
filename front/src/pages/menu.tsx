import React  from 'react';
import Layout from '../components/Layout';
import Navigation from '../components/Navigation';
import axios from 'axios';
import { END } from 'redux-saga';
import { LOAD_MY_INFO_REQUEST } from '../actions/user';
import wrapper from '../store/configureStore';

const Menu=()=>{
    return(
        <Layout PageName="메뉴">
            <Navigation/>
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
    context.store.dispatch(END);
    await context. store['sagaTask'].toPromise();
});


export default Menu;