import React from 'react';
import wrapper from '../store/configureStore';
import Head from 'next/head';
import GlobalStyle from '../components/GlobalStyle';

interface Props {
    Component?:any;
}

 const App=({Component} : Props)=>{
    return(
        <>
        <GlobalStyle/>
            <Head>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nanum+Myeongjo&display=swap" />
                <meta charSet="utf-8"/>
                <title>영리</title>
            </Head>
            <div id="alert-root"/>
            <Component/>
        </>
    );
}

export default wrapper.withRedux(App);