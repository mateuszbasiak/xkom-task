import React from 'react';
import styled from 'styled-components';

interface Props{
    error: boolean;
}

const StyledInput = styled('input')<{error: boolean, type: 'text'}>`
    width: 165px;
    height: 38px;
    border-radius: 0px;
    background: white;
    border: 2px solid black;
    outline: none;
    ${props => props.error ? 'outline: 2px solid red' : ''};
    font-size: var(--fs-normal);

    &:focus{
        box-shadow: 0 0 2px 0 black;
    }
`;


const InputText: React.FC<React.HTMLProps<HTMLInputElement> & Props> = ({ onChange, error }) =>  {
	return (
		<StyledInput error={error} name='styled-input' onChange={onChange} type='text' />
	);
};

export default InputText;