import React from 'react';
import styled from 'styled-components';

interface Props{
    fill?:boolean;
    shadow?:boolean;
    disabled?:boolean;
    color?:string;
    onClick?: (e: React.MouseEvent) => void;
    title?:string;
}

const button=({ fill=false, shadow=false, disabled=false,color="#e6b3cc", onClick,title } : Props)=>{
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
    color:${(props)=>props.color === "#cc00cc" ? '#fff' : 'black'};
    background-color:${(props)=>props.color};

    box-shadow:${(props)=>props.shadow==="true"? '0px 0px 11px -1px rgba(0,0,0,0.75)' :''};
    cursor:pointer;
    
    &:disabled{
        cursor: not-allowed;
    }
`;

export default button;