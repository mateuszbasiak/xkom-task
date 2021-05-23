import React from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';
import Checkbox from '../../components/CheckBox';
import { useAppDispatch, useAppSelector } from '../../Redux/Store';
import InputText from '../../components/TextInput';
import { MainPageAction, setMainError, setNumberAndConnected } from './Actions';
import { RouteAction, routeTo } from '../../Redux/Reducer';
import { Redirect } from 'react-router';

interface Props{

}

const StyledDiv = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: var(--fs-normal);
`;

const ContentForm = styled.form`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    top: -5%;
    width: 355px;
    height: 230px;
`;

const InputTextWrap = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const CheckBoxWrap = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    align-items: center;
`;

const ButtonWrap = styled.div`
    width: 100%;;
    height: 70px;
`;

const StyledP = styled('p')<{ error: boolean }>`
    position: absolute;
    top: 20%;
    color: red;
    font-size: 0.7rem;
    transition: all 250ms ease;
    opacity: ${props => props.error ? '1' : '0'};
`;


const MainPage: React.FC<Props> = () => {
	const appDispatch = useAppDispatch();
	const dispatch = (action: MainPageAction | RouteAction) => appDispatch(action);
	const error = useAppSelector(state => state.mainPage.error);
	const currPage = useAppSelector(state => state.currPage);

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		const targets = (event.currentTarget as HTMLFormElement).elements;
		const numSeats = parseInt((targets[0] as HTMLInputElement).value.trim());
		const connected = (targets[1] as HTMLInputElement).checked;   
		if(!error && !isNaN(numSeats)){
			dispatch(setNumberAndConnected(numSeats, connected));
			dispatch(routeTo('chooseseat'));
		}
		else{
			dispatch(setMainError(true));
		}
	};

	const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
		let good = true;
		const value = event.currentTarget.value.trim();
		for(let i = 0; i < value.length; i++){
			if(value[i] < '0' || value[i] > '9'){
				good = false;
				break;
			}
		}
		const parsedNum = parseInt(value);
		if(!error && (!good || parsedNum < 1 || parsedNum > 115)){
			dispatch(setMainError(true));
		}
		else if(error && good && parsedNum > 0 && parsedNum <= 115){
			dispatch(setMainError(false));
		}
	};

	if(currPage !== 'mainpage') return <Redirect to={`/${currPage}`} />;

	return (
		<StyledDiv>
			<ContentForm onSubmit={handleSubmit}>
				<InputTextWrap>
					<span style={{'margin': '0 0 0 15px'}}>Liczba miejsc:</span>
					<InputText error={error} onChange={handleChange}/>
					<StyledP error={error}>*Liczba miejsc powinna być numerem z przedziału [1; 115]</StyledP>
				</InputTextWrap>
				<CheckBoxWrap>
					<Checkbox />
					<span>Czy miejsca mają być obok siebie?</span>
				</CheckBoxWrap>
				<ButtonWrap>
					<Button error={error} style={{width: '100%', height: '70px'}} buttonText={'Wybierz miejsca'} />
				</ButtonWrap>
			</ContentForm>
		</StyledDiv>);
};

export default MainPage;