import React , { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../../../actions/user';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Icon from '../../../atoms/Icons';

const Logout=()=>{
    const dispatch = useDispatch();

    // 로그아웃 
    const onClick=useCallback(()=>{
        dispatch(logoutAction())
    },[]);

    return(
        <Icon
        icon={faSignOutAlt}
        onClick={onClick}
        color="lightPurple"
        className="faSignOutAlt"
        />
    );
}


export default Logout;