import React, { useState } from 'react';
import styled from 'styled-components';

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  visibility: hidden;
  position: absolute;
  overflow: hidden;
  padding: 0;
  white-space: nowrap;
  z-index: -1;
`;

const StyledCheckbox = styled.div`
  display: inline-block;
  box-sizing: border-box;
  width: var(--checkbox-size);
  height: var(--checkbox-size);
  border: 2px solid black;
  border-radius: 3px;
  outline: none;
  &:hover, &:focus{
    box-shadow: 0 0 2px 0 black;
  }
`;

const CheckboxContainer = styled.div`
  --checkbox-size: 25px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const Icon = styled('svg')<{ checked: boolean }>`
  position: absolute;
  height: 31px;
  left: 10px;
  fill: none;
  stroke: black;
  stroke-width: 3px;
  transition: all 100ms linear;
  opacity: ${props => props.checked ? '1' : '0'};
  z-index: -1;
`;


const Checkbox: React.FC<React.HTMLProps<HTMLInputElement>> = () =>  {
	const [checked, setChecked] = useState<boolean>(false);

	return (
		<CheckboxContainer>
			<HiddenCheckbox tabIndex={-1} readOnly checked={checked} type='checkbox' />
			<StyledCheckbox tabIndex={0} onClick={() => setChecked(!checked)} onKeyDown={(e) => e.key === ' ' ? setChecked(!checked) : null} />
			<Icon checked={checked} viewBox="0 0 24 24">
				<polyline points="24 0 12 17 7 12" />
			</Icon>
		</CheckboxContainer>
	);
};

export default Checkbox;