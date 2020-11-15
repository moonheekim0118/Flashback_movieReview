import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';

export default function index(){
    return(
        <Layout>
        <Link href="/">홈</Link>
        </Layout>
    );
}