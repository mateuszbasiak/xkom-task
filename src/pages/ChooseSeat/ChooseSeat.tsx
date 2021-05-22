import React from 'react';
import Seat from '../../components/Seat';
import styled from 'styled-components';
import Button from '../../components/Button';
import { useAppSelector } from '../../Reducer/hooks';
import { ISeat } from './Actions';

interface Props{

}

const SeatsWrap = styled.div`
    --seat-size: 90px;
    display: flex;
    justify-content: space-between;
    align-items: space-evenly;
    flex-wrap: wrap;
    width: 1630px;
    margin: auto;
    padding: 30px;
    gap: 20px;
`;

const SeatDesc = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    font-size: var(--fs-normal);
    height: var(--seat-size);
`;

const ButtonWrap = styled.div`
    width: calc(4 * var(--seat-size) + 3 * 20px);
    height: var(--seat-size);
	margin-left: auto;
`;

const Footer = styled.div`
    position: relative;
    width: 100%;
    height: 140px;
    display: flex;
    align-items: end;
`;

const generateSeats = (seats: Array<ISeat>): Array<JSX.Element>=> {
	let counter = 0;
	const res: Array<JSX.Element> = [];
	for(let i = 0; i < 7; i++){
		for(let j = 0; j < 15; j++){
			const tempSeat = seats.find(seat => seat.cors.x === j && seat.cors.y === i);
			if(tempSeat === undefined){
				res.push(<Seat key={counter++} type='invisible' clickable={false} />);
			}
			else if(tempSeat?.reserved){
				res.push(<Seat key={counter++} type='reserved' clickable={false} seat={tempSeat} />);
			}
			else{
				res.push(<Seat key={counter++} type='free' clickable seat={tempSeat} />);   
			}
		}
	}
	return res;
};

const ChooseSeat: React.FC<Props> = () => {
	const seats: Array<ISeat> = useAppSelector(state => state.seats);

	return (
		<SeatsWrap>
			{generateSeats(seats)}
			<Footer>
				<SeatDesc style={{width: '24%',}}>
					<Seat type='free' clickable={false} />
					<span>Miejsca dostępne</span>
				</SeatDesc>
				<SeatDesc style={{width: '26%'}}>
					<Seat type='reserved' clickable={false} />
					<span>Miejsca zarezerwowane</span>
				</SeatDesc>
				<SeatDesc style={{width: '20%',}}>
					<Seat type='chosen' clickable={false} />
					<span>Twój wybór</span>
				</SeatDesc>
				<ButtonWrap>
					<Button buttonText='Rezerwuj' />
				</ButtonWrap>
            
			</Footer>
		</SeatsWrap>);
};

export default ChooseSeat;