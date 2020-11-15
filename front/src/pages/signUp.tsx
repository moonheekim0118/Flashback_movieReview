import React from 'react';
import Layout from '../components/Layout';
import SignUpForm from '../components/User/SignUp';

const SingUp=()=>{
    return(
        <Layout PageName="회원가입">
            <SignUpForm/>
        </Layout>
    );
}

export default SingUp;