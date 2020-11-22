import React , { useEffect } from 'react';
import Layout from '../components/Layout';
import { LOAD_MY_INFO_REQUEST } from '../actions/user';
import { useDispatch, useSelector } from 'react-redux'
import Info from '../components/User/Info';

const User=()=>{
    const dispatch = useDispatch();
    const myInfo = useSelector((state)=>state.user.myInfo);

    useEffect(()=>{
        dispatch({
            type:LOAD_MY_INFO_REQUEST
        });
    },[]);
    
    if(!myInfo){
        return(
            <Layout PageName="내 정보">
                잠시후에 다시 시도해주세요.
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