import React from 'react';
import Seat from '../../components/Seat';
import styled from 'styled-components';
import Button from '../../components/Button';

interface Props{

}

const SeatsWrap = styled.div`
    --seat-size: 85px;
    display: flex;
    justify-content: space-between;
    align-items: space-evenly;
    flex-wrap: wrap;
    width: 1600px;
    height: 700px;
    margin: auto;
    padding: 60px;
    gap: 20px;
`;

const SeatDesc = styled.div`
    display: flex;
    align-items: center;
    width: 25%;
    gap: 20px;
    font-size: var(--fs-normal);
    height: var(--seat-size);
`;

const ButtonWrap = styled.div`
    width: calc(4 * var(--seat-size) + 4 * 18px);
    height: var(--seat-size);
`;

const Footer = styled.div`
    position: relative;
    width: 100%;
    height: 140px;
    display: flex;
    align-items: end;
`;

const generateSeats = (): Array<JSX.Element>=> {
	const res: Array<JSX.Element> = [];
	for(let i = 0; i < 7; i++){
		for(let j = 0; j < 15; j++){
			if(j > 0 && j % 5 === 0){
				res.push(<Seat type='invisible' clickable={false} />);
			}
			else if(i < 3 && j < 2){
				res.push(<Seat type='invisible' clickable={false} />);
			}
			else if(i === 3 && j > 5){
				res.push(<Seat type='invisible' clickable={false} />);
			}
			else{
				res.push(<Seat type='free' clickable={true} />);   
			}
		}
	}
	return res;
};


const ChooseSeat: React.FC<Props> = () => {


	return (
		<SeatsWrap>
			{generateSeats()}
			<Footer>
				<SeatDesc>
					<Seat type='free' clickable={false} />
					<span>Miejsca dostępne</span>
				</SeatDesc>
				<SeatDesc>
					<Seat type='reserved' clickable={false} />
					<span>Miejsca zarezerwowane</span>
				</SeatDesc>
				<SeatDesc>
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