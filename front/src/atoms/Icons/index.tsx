import React from 'react';
import styled from 'styled-components';
import { 
    FontAwesomeIcon,
    FontAwesomeIconProps
} from '@fortawesome/react-fontawesome';

interface Props {
    size?:number;
    icon?:FontAwesomeIconProps['icon'];
    className?:string;
    onClick?: (e: React.MouseEvent) => void;
}

const Icon=({ size = 24 , icon, className, onClick=null}: Props)=>{
    return(
       <StyledIcon
        iconsize={size}
        icon={icon}
        className={className}
        onClick={onClick}
       />
    );
}

const StyledIcon = styled<{ iconsize: number}>(FontAwesomeIcon)`
    width:${(props)=>props.iconsize}px;
    height:${(props)=>props.iconsize}px;
    font-size: ${(props)=>props.iconsize}px;
    
    cursor:pointer;
`;

export default Icon;