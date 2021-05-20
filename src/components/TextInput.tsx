import React from 'react';
import styled from 'styled-components';


const StyledInput = styled.input.attrs({type: 'text'})`
    width: 175px;
    height: 38px;
    border-radius: 0px;
    background: white;
    border: 2px solid black;
    font-size: var(--fs-normal);

    &:focus{
        box-shadow: 0 0 0 1px black;
    }
`;


const InputText: React.FC<React.HTMLProps<HTMLInputElement>> = () =>  {
	return (
		<StyledInput type='text' />
	);
};

export default InputText;