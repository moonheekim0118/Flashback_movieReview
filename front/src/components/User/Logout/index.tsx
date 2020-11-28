import React , { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { LOGOUT_REQUEST } from '../../../actions/user';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Icon from '../../../atoms/Icons';

const Logout=()=>{
    const dispatch = useDispatch();

    const onClick=useCallback(()=>{
        dispatch({ type:LOGOUT_REQUEST })
    },[]);

    return(
        <Icon
        icon={faSignOutAlt}
        onClick={onClick}
        color={"lightPurple"}
        className={"faSignOutAlt"}
        />
    );
}


export default Logout;