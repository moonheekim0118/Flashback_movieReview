import React from 'react';
import Layout from '../components/Layout';
import LoginForm from '../components/User/Login';

const Login=()=>{

    return(
        <Layout PageName="로그인">
            <LoginForm/>
        </Layout>
    );
}

export default Login;