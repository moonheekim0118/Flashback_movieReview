import React  from 'react';
import Layout from '../components/Layout';
import Navigation from '../components/Navigation';
import axios from 'axios';
import { END } from 'redux-saga';
import { loadMyInfoAction } from '../actions/user';
import { useSelector } from 'react-redux';
import wrapper from '../store/configureStore';

const Menu=()=>{
    const loginDone=useSelector((state)=>state.user.loginDone);
    return(
        <Layout PageName="메뉴">
            <Navigation loginDone={loginDone}/>
        </Layout>
    );
}

export const getServerSideProps = wrapper.getServerSideProps(async (context)=>{
    const cookie=context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie='';
    if(context.req && cookie){
        axios.defaults.headers.Cookie=cookie;
    }
    context.store.dispatch(loadMyInfoAction());
    context.store.dispatch(END);
    await context. store['sagaTask'].toPromise();
});


export default Menu;