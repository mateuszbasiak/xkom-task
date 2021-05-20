import React from 'react';
import styled from 'styled-components';

type seatType = 'free' | 'reserved' | 'chosen' | 'invisible';

interface Props{
    type: seatType;
    clickable: boolean;
}

const StyledDiv = styled('div')<{ type: seatType, clickable: boolean }>`
    box-sizing: border-box;
    border: 2px solid black;
    width: var(--seat-size);
    height: var(--seat-size);
    background: ${props => props.type === 'free' ? 'white' : props.type === 'chosen' ? '#ff8a05' : '#474747'};
    visibility: ${props => props.type === 'invisible' ? 'hidden' : 'visible'};
    transition: all 150ms ease;

    &:hover{
        ${props => props.clickable ? 'box-shadow: 0 0 0 1px black' : ''};
    }
`;

const Seat: React.FC<Props> = ({ type, clickable }) => {
	return <StyledDiv type={type} clickable={clickable} />;
};

export default Seat;