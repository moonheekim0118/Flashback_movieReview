import React from 'react';
import Head from 'next/head';

interface Props {
    Component?:any;
}

export default function App({Component} : Props){
    return(
        <>
            <Head>
                <meta charSet="utf-8"/>
                <title>영화덕후</title>
            </Head>
            <Component/>
        </>
    );
}