import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import styled from 'styled-components';
import { pageType, State } from '../../Redux/Reducer';
import { SeatInfo } from '../ChooseSeat/Actions';

interface Props{
    chosenSeats: Array<SeatInfo>;
    currPage: pageType;
}

const ContentWrap = styled.div`
    font-size: 2.6rem;
    width: 100%;
    padding: 50px;
`;

const Title = styled.div`
    font-size: 2.8rem;
    font-weight: bold;
`;

const Footer = styled.div`
    font-size: 2.3rem;
    font-weight: bold;
`;

const SeatsWrap = styled.div`
    padding: 80px 0;
`;

const Seat = styled.div`
    font-size: 2.3rem;
    margin-top: 15px;
`;

const Summary: React.FC<Props> = ({ chosenSeats, currPage }) => {
	if(currPage !== 'summary'){
		if(currPage === 'mainpage') return <Redirect to='/' />;
		return <Redirect to={`/${currPage}`} />;
	}

	return (
		<ContentWrap>
			<Title>Twoja rezerwacja przebiegła pomyślnie!</Title>
			<SeatsWrap>
                Wybrałeś miejsca:
				{chosenSeats.map(seat => <Seat key={seat.id}>- rząd {seat.x}, miejsce {seat.y} ({seat.id})</Seat>)}
			</SeatsWrap>
			<Footer>Dziękujemy! W razie problemów prosimy o kontakt z działem administracji.</Footer>
		</ContentWrap>
	);
};


const mapStateToProps = (state: State): Props => {
	return {
		chosenSeats: state.chooseSeat.chosenSeats,
		currPage: state.currPage
	};
};


export default connect(mapStateToProps)(Summary);
