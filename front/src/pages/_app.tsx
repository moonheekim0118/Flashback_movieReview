import React from 'react';
import Head from 'next/head';
import GlobalStyle from '../components/GlobalStyle';

interface Props {
    Component?:any;
}

export default function App({Component} : Props){
    return(
        <>
        <GlobalStyle/>
            <Head>
                <style>
                @import url('https://fonts.googleapis.com/css2?family=Nanum+Myeongjo&display=swap');
                </style>
                <meta charSet="utf-8"/>
                <title>영리</title>
            </Head>
            <Component/>
        </>
    );
}