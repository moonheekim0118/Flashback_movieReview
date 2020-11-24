import React , { useEffect } from 'react';
import Router from 'next/router';
import Layout from '../components/Layout';
import { LOAD_MY_INFO_REQUEST } from '../actions/user';
import { useDispatch, useSelector } from 'react-redux'
import Info from '../components/User/Info';

const User=()=>{
    const dispatch = useDispatch();
    const { myInfo, loginDone } = useSelector((state)=>state.user);

    useEffect(()=>{
        if(!loginDone){ // 로그인 안되어있는 경우 
            Router.replace('/login');
        }
        else{
            dispatch({ // 로그인 되어있는 경우 
                type:LOAD_MY_INFO_REQUEST
            });
        }
    },[]);
    
    if(!myInfo){
        return(
            <Layout PageName="내 정보">
                다시 로그인 해주세요.
            </Layout>
        )
    }
    return(
        <Layout PageName="내 정보">
            <Info myInfo={myInfo}/>
        </Layout>
    );
}

export default User;