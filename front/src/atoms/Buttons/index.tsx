import React from 'react';
import styled from 'styled-components';
import { colorCode } from '../../util/color';

interface Props{
    fill?:boolean; // 버튼 크기 100% or not
    shadow?:boolean; // 버튼 has shadow or not 
    disabled?:boolean; // 버튼 is disabled or not
    color?:string; // 버튼's color
    onClick?: (e: React.MouseEvent) => void;
    title?:string;
}

const button=({ fill=false, shadow=false, disabled=false, color="lightPurple", onClick=null, title } : Props)=>{
    return(
        <Button 
        fill={fill.toString()} 
        shadow={shadow.toString()} 
        color={color} 
        onClick={onClick}
        disabled={disabled}>
            {title}
        </Button>
    );
}

const Button = styled.button<{ fill:string , color:string}>
`
    width:${(props)=>props.fill ==="true"? '100%':''};
    padding: 10px 15px;

    border:none;
    border-radius:5px;
    
    font-size:1.2rem;
    color:${(props)=>props.color === "purple" ? "#fff" : "black"};
    background-color:${(props)=>colorCode[`${props.color}`]};

    box-shadow:${(props)=>props.shadow==="true"? '0px 0px 11px -1px rgba(0,0,0,0.75)' :''};
    cursor:pointer;
    
    &:disabled{
        cursor: not-allowed;
    }
`;

export default button;