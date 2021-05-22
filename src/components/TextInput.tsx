import React from 'react';
import styled from 'styled-components';

interface Props{
    error: boolean;
}

const StyledInput = styled('input')<{error: boolean, type: 'text'}>`
    width: 175px;
    height: 38px;
    border-radius: 0px;
    background: white;

    border: 2px solid black;
    ${props => props.error ? 'outline: 2px solid red' : ''};
    font-size: var(--fs-normal);

    &:focus{
        box-shadow: 0 0 1px 1px black;
    }
`;


const InputText: React.FC<React.HTMLProps<HTMLInputElement> & Props> = ({ onChange, error }) =>  {
	return (
		<StyledInput defaultValue={'1'} error={error} onChange={onChange} type='text' />
	);
};

export default InputText;