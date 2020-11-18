import React from 'react';
import styled from 'styled-components';
import { 
    FontAwesomeIcon,
    FontAwesomeIconProps
} from '@fortawesome/react-fontawesome';
import { colorCode } from '../../util/color';

interface Props {
    size?:number;
    icon?:FontAwesomeIconProps['icon'];
    className?:string;
    color?:string;
    onClick?: (e: React.MouseEvent) => void;
}

const Icon=({ size = 24 , icon, className, color="purple", onClick=null}: Props)=>{
    return(
       <StyledIcon
        iconsize={size}
        icon={icon}
        className={className}
        color={color}
        onClick={onClick}
       />
    );
}

const StyledIcon = styled<{ iconsize: number , color:string}>(FontAwesomeIcon)`
    width:${(props)=>props.iconsize}px;
    height:${(props)=>props.iconsize}px;
    font-size: ${(props)=>props.iconsize}px;
    color:${(props)=>colorCode[`${props.color}`]};
    cursor:pointer;

    transition: 0.2s color ease-in-out;

`;

export default Icon;