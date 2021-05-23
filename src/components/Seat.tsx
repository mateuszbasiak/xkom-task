import React from 'react';
import styled from 'styled-components';
import { addChosenSeats, deleteChosenSeat, SeatInfo, setChooseError } from '../pages/ChooseSeat/Actions';
import { useAppDispatch, useAppSelector } from '../Reducer/hooks';

type seatType = 'free' | 'reserved' | 'chosen' | 'invisible';

interface Props{
    type: seatType;
    clickable: boolean;
    seatInfo?: SeatInfo;
}

const StyledDiv = styled('div')<{ type: seatType, clickable: boolean }>`
    box-sizing: border-box;
    border: 2px solid black;
    width: var(--seat-size);
    height: var(--seat-size);
    background: ${props => props.type === 'free' ? 'white' : props.type === 'chosen' ? '#ff8a05' : '#474747'};
    visibility: ${props => props.type === 'invisible' ? 'hidden' : 'visible'};
    ${props => props.clickable ? '' : 'pointer-events: none'};
    transition: all 500ms ease;

    &:hover{
        background: rgb(255, 138, 5, 0.5);
    }
`;

const Seat: React.FC<Props> = ({ type, clickable, seatInfo }) => {
	const dispatch = useAppDispatch();
	const chosenSeats = useAppSelector(state => state.chosenSeats);
	const numSeats = useAppSelector(state => state.numSeats);
    
	const handleClick = () =>{
		if(type === 'chosen' && seatInfo){
			dispatch(deleteChosenSeat(seatInfo, chosenSeats));
			dispatch(setChooseError(true));
		}
		else if(chosenSeats.length < numSeats && type === 'free' && seatInfo){
			dispatch(addChosenSeats([seatInfo]));
			if(chosenSeats.length + 1 === numSeats)
				dispatch(setChooseError(false));
		}
	};

	return <StyledDiv type={type} clickable={chosenSeats.length < numSeats ? clickable : type === 'chosen' ? true : false} onClick = {() => handleClick()}/>;
};

export default Seat;