import React, { useEffect } from 'react';
import Seat from '../../components/Seat';
import styled from 'styled-components';
import Button from '../../components/Button';
import { useAppDispatch } from '../../Redux/Store';
import { addChosenSeats, ChooseSeatAction, fetchError, ISeat, SeatInfo, seatsFetched, setFetchingStatus } from './Actions';
import axios from 'axios';
import { pageType, RouteAction, routeTo, State } from '../../Redux/Reducer';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import Loading from 'react-loading';

interface Props{
	seats: Array<ISeat>;
	chosenSeats: Array<SeatInfo>;
	numSeats: number;
	error: boolean;
	fetchingError: boolean;
	fetchingData: boolean;
	connected: boolean;
	currPage: pageType;
}

const ContentWrap = styled.form`
    --seat-size: 70px;
	--gap-size: 12px;
    display: flex;
    justify-content: space-between;
    align-items: space-evenly;
    flex-wrap: wrap;
    width: calc(15 * var(--seat-size) + 14 * var(--gap-size));
    margin: auto;
    padding: 20px;
    gap: var(--gap-size);
`;

const SeatDesc = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    font-size: var(--fs-normal);
    height: var(--seat-size);
`;

const ButtonWrap = styled.div`
    width: calc(4 * var(--seat-size) + 3 * var(--gap-size));
    height: var(--seat-size);
	margin-left: auto;
`;

const Footer = styled.div`
    position: relative;
	margin-top: 65px;
    width: 100%;
    display: flex;
`;

const StyledP = styled('p')<{ error: boolean }>`
    position: absolute;
	top: -45%;
    color: red;
    font-size: 0.8rem;
    transition: all 250ms ease;
    opacity: ${props => props.error ? '1' : '0'};
`;

const ErrorWrap = styled.div`
	font-size: 3rem;
	font-weight: bold;
	padding: 50px;
	bottom: 100px;
	position: relative;
	height: 100vh;
	text-align: center;
	justify-content: center;
	display: flex;
	align-items: center;
`;

const LoadingWrap = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const generateSeats = (seats: Array<ISeat>, chosenSeats: Array<SeatInfo>): Array<JSX.Element> => {
	let counter = 0;
	const res: Array<JSX.Element> = [];
	if(seats.length > 0){
		const size = seats[seats.length - 1].cords.x + 1;
		for(let i = 0; i < 15 * size; i++){
			const x = Math.floor(i / 15), y = i % 15;
			const tempSeat = seats.find(seat => seat.cords.x === x && seat.cords.y === y);
			if(tempSeat === undefined){
				res.push(<Seat key={counter++} type='invisible' clickable={false} />);
			}
			else if(tempSeat?.reserved){
				res.push(<Seat key={counter++} type='reserved' clickable={false} seatInfo={{x, y, id: tempSeat.id}} />);
			}
			else{
				const tempChosenSeat = chosenSeats.find(seat => seat.x === x && seat.y === y);
				if(tempChosenSeat === undefined){
					res.push(<Seat key={counter++} type='free' clickable seatInfo={{x, y, id: tempSeat.id}} />); 
				}
				else{
					res.push(<Seat key={counter++} type='chosen' clickable seatInfo={{x, y, id: tempSeat.id}} />);
				}
			}
		}
	}
	return res;
};

const findConnectedSeats = (seats: Array<ISeat>, startingSeat: ISeat, numSeats: number, currentSeats: Array<SeatInfo>): Array<SeatInfo> => {
	if(currentSeats.length === numSeats) return currentSeats;
	const x = startingSeat.cords.x;
	const y = startingSeat.cords.y;
	let tempSeat = seats.find(seat => seat.cords.x === x && seat.cords.y === y - 1);
	if(tempSeat !== undefined && !tempSeat.reserved && !currentSeats.find(seat => seat.x === x && seat.y === y - 1)){
		const tempSeats = currentSeats;
		tempSeats.push({x, y: y - 1, id: tempSeat.id});
		const res = findConnectedSeats(seats, tempSeat, numSeats, tempSeats);
		if(res.length > 0) return res;
	}
	tempSeat = seats.find(seat => seat.cords.x === x && seat.cords.y === y + 1);
	if(tempSeat !== undefined && !tempSeat.reserved && !currentSeats.find(seat => seat.x === x && seat.y === y + 1)){
		const tempSeats = currentSeats;
		tempSeats.push({x, y: y + 1, id: tempSeat.id});
		const res = findConnectedSeats(seats, tempSeat, numSeats, tempSeats);
		if(res.length > 0) return res;
	}
	tempSeat = seats.find(seat => seat.cords.x === x - 1 && seat.cords.y === y);
	if(tempSeat !== undefined && !tempSeat.reserved && !currentSeats.find(seat => seat.x === x - 1 && seat.y === y)){
		const tempSeats = currentSeats;
		tempSeats.push({x: x - 1, y, id: tempSeat.id});
		const res = findConnectedSeats(seats, tempSeat, numSeats, tempSeats);
		if(res.length > 0) return res;
	}
	tempSeat = seats.find(seat => seat.cords.x === x + 1 && seat.cords.y === y);
	if(tempSeat !== undefined && !tempSeat.reserved && !currentSeats.find(seat => seat.x === x + 1 && seat.y === y)){
		const tempSeats = currentSeats;
		tempSeats.push({x: x + 1, y, id: tempSeat.id});
		const res = findConnectedSeats(seats, tempSeat, numSeats, tempSeats);
		if(res.length > 0) return res;
	}
	return [];
};

const chooseInitialSeats = (seats: Array<ISeat>, numSeats: number, connected: boolean): Array<SeatInfo> => {
	if(connected){
		for(let i = 0; i < seats.length; i++){
			if(!seats[i].reserved){
				const res = findConnectedSeats(seats, seats[i], numSeats, [{x: seats[i].cords.x, y: seats[i].cords.y, id: seats[i].id}]);
				if(res.length === numSeats) return res;
			}
		}
		return chooseInitialSeats(seats, numSeats, false);
	}
	else{
		const res: Array<SeatInfo> = [];
		for(let i = 0; i < seats.length; i++){
			if(!seats[i].reserved){
				res.push({x: seats[i].cords.x, y: seats[i].cords.y, id: seats[i].id});
				if(res.length === numSeats) return res;
			}
		}
		return [];
	}
};

const ChooseSeat: React.FC<Props> = ({ seats, numSeats, chosenSeats, error, fetchingError, connected, currPage, fetchingData }) => {
	const appDispatch = useAppDispatch();
	const dispatch = (action: ChooseSeatAction | RouteAction) => appDispatch(action);
	const diff = numSeats - chosenSeats.length;

	useEffect(() => {
		dispatch(setFetchingStatus(true));
		const fetchSeats = async () => {
			const response = await axios.get<Array<ISeat>>('http://localhost:3000/seats').then(response => response.data).catch(() => {dispatch(fetchError()); return [] as Array<ISeat>;});
			if(response){
				dispatch(seatsFetched(response));
			}
			else{
				dispatch(fetchError());
			}
		};
		fetchSeats();
	}, []);

	useEffect(() => {
		if(seats.length > 0 && chosenSeats.length === 0){
			const chosenSeats = chooseInitialSeats(seats, numSeats, connected);
			if(chosenSeats.length === 0){
				dispatch(fetchError());
			}
			else{
				dispatch(addChosenSeats(chosenSeats));
				dispatch(setFetchingStatus(false));
			}
		}
	}, [seats]);

	if(currPage !== 'chooseseat'){
		if(currPage === 'mainpage') return <Redirect to='/' />;
		return <Redirect to={`/${currPage}`} />;
	}
	
	if(fetchingError && seats.length > 0) return <ErrorWrap>BŁĄD: Brak wystarczającej ilości wolnych miejsc. Prosimy wybrać mniejszą liczbę miejsc.</ErrorWrap>;

	if(fetchingError && seats.length === 0) return <ErrorWrap>BŁĄD: Prosimy odświeżyć stronę</ErrorWrap>;

	if(fetchingData) return <LoadingWrap><Loading height={100} width={100} type='spin' color='black'/></LoadingWrap>;

	return (
		<ContentWrap onSubmit={() => dispatch(routeTo('summary'))}>
			{generateSeats(seats, chosenSeats)}
			<Footer>
				<SeatDesc style={{width: '24%',}}>
					<Seat type='free' clickable={false} />
					<span>Miejsca dostępne</span>
				</SeatDesc>
				<SeatDesc style={{width: '26.5%'}}>
					<Seat type='reserved' clickable={false} />
					<span>Miejsca zarezerwowane</span>
				</SeatDesc>
				<SeatDesc >
					<Seat type='chosen' clickable={false} />
					<span>Twój wybór</span>
				</SeatDesc>
				<ButtonWrap>
					<StyledP error={error}>*{diff === 1 || diff >= 5 ? 'Pozostało' : 'Pozostały'} {diff} {diff === 1 ? 'miejsce' : diff < 5 ? 'miejsca' : 'miejsc'} do wyboru</StyledP>
					<Button error={error} buttonText='Rezerwuj' />
				</ButtonWrap>
			</Footer>
		</ContentWrap>);
};

const mapStateToProps = (state: State): Props => {
	return {
		seats: state.chooseSeat.seats,
		numSeats: state.mainPage.numSeats,
		error: state.chooseSeat.error,
		chosenSeats: state.chooseSeat.chosenSeats,
		fetchingError: state.chooseSeat.fetchingError,
		fetchingData: state.chooseSeat.fetchingData,
		connected: state.mainPage.connected,
		currPage: state.currPage
	};
};

export default connect(mapStateToProps)(ChooseSeat);