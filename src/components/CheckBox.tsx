import React, { useState } from 'react';
import styled from 'styled-components';

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  opacity: 0;
  margin: 0;
  overflow: hidden;
  padding: 0;
  width: var(--checkbox-size);
  height: var(--checkbox-size);
  position: absolute;
  white-space: nowrap;
  z-index: 2;
`;

const StyledCheckbox = styled.div`
  display: inline-block;
  box-sizing: border-box;
  width: var(--checkbox-size);
  height: var(--checkbox-size);
  border: 2px solid black;
  border-radius: 3px;
  transition: all 250ms;

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 1px black;
  }
`;

const CheckboxContainer = styled.div`
  height: 30px;
  --checkbox-size: 30px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const Icon = styled('svg')<{ checked: boolean }>`
  position: relative;
  height: 37px;
  right: 7px;
  bottom: 5px;
  fill: none;
  stroke: black;
  stroke-width: 3px;
  transition: all 100ms ease;
  transform: ${props => props.checked ? 'scale(1)' : 'scale(0)'};
`;


const Checkbox: React.FC<React.HTMLProps<HTMLInputElement>> = () =>  {
	const [checked, setChecked] = useState<boolean>(false);

	return (
		<CheckboxContainer>
			<HiddenCheckbox type='checkbox' onChange={(event: React.ChangeEvent<HTMLInputElement>) => setChecked(event.target.checked)} />
			<StyledCheckbox>
				<Icon checked={checked} viewBox="0 0 24 24">
					<polyline points="24 0 12 17 7 12" />
				</Icon>
			</StyledCheckbox>
            
		</CheckboxContainer>
	);
};

export default Checkbox;