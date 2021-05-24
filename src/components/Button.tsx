import React from 'react';
import styled from 'styled-components';

interface Props{
    buttonText: string;
    error: boolean;
}

const StyledButton = styled('button')<{ error: boolean }>`
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
    outline: none;
    ${props => props.error ? 'pointer-events: none' : ''};
    
    &:hover, &:focus{
        background: black;
        color: white;
    }
`;

const Button: React.FC<React.HTMLProps<HTMLButtonElement> & Props> = ({ buttonText, error }) => {
	return <StyledButton error={error} tabIndex={error ? -1 : 0} type={'submit'}>{buttonText}</StyledButton>;
};

export default Button;