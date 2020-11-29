import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon,
        FontAwesomeIconProps
} from '@fortawesome/react-fontawesome';
import { colorCode } from '../../util/color';

interface Props {
    size?:number; // 사이즈 
    icon:FontAwesomeIconProps['icon']; //아이콘 
    className:string;
    color?:string; // 색상 
    onClick?:(e: any) => void;
}

const Icon=({ size , icon, className, color, onClick }: Props)=>{
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

Icon.defaultProps={
    size:24,
    color:'purple',
    onClick:null,
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