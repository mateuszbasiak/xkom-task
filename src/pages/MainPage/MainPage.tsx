import React from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';
import Checkbox from '../../components/CheckBox';
import { useAppDispatch, useAppSelector } from '../../Reducer/hooks';
import InputText from '../../components/TextInput';

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
    width: 360px;
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
	const dispatch = useAppDispatch();
	const error = useAppSelector(state => state.error);

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		const targets = event.currentTarget as HTMLFormElement;
		const numSeats = parseInt((targets[0] as HTMLInputElement).value);
		const connected = (targets[1] as HTMLInputElement).checked;   
		if(!error){
			dispatch({type: 'SET_NUMBER_CONNECTED', payload: {numSeats, connected}});
			dispatch({type: 'ROUTE_TO', payload: { location: 'ChooseSeat' }});
		}
	};

	const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
		const parsedNum = parseInt(event.currentTarget.value);
		if(!error && (isNaN(parsedNum) || parsedNum < 1 || parsedNum > 90)){
			dispatch({type: 'SET_MAIN_ERROR', payload: { error: true }});
		}
		if(error && parsedNum > 0 && parsedNum < 90){
			dispatch({type: 'SET_MAIN_ERROR', payload: { error: false }});
		}
	};


	return (
		<StyledDiv>
			<ContentForm onSubmit={handleSubmit}>
				<InputTextWrap>
					<span>Liczba miejsc:</span>
					<InputText error={error} onChange={handleChange}/>
					<StyledP error={error}>*Liczba miejsc powinna być numerem z przedziału [1; 90]</StyledP>
				</InputTextWrap>
				<CheckBoxWrap>
					<Checkbox />
					<span>Czy miejsca mają być obok siebie?</span>
				</CheckBoxWrap>
				<ButtonWrap>
					<Button style={{width: '100%', height: '70px'}} buttonText={'Wybierz miejsca'} />
				</ButtonWrap>
			</ContentForm>
		</StyledDiv>);
};

export default MainPage;