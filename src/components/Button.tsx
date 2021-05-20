import React from 'react';
import styled from 'styled-components';

interface Props{
    buttonText: string;
}

const StyledButton = styled.button`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border-radius: 0px;
    background: white;
    cursor: pointer;
    border: 2px solid black;
    transition: all 250ms linear;
    font-size: var(--fs-normal);
    color: black;

    :hover{
        background: black;
        color: white;
    }
`;

const Button: React.FC<React.HTMLProps<HTMLButtonElement> & Props> = ({ buttonText }) => {
	return <StyledButton type={'submit'}>{buttonText}</StyledButton>;
};

export default Button;