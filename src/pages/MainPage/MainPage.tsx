import React from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';
import Checkbox from '../../components/CheckBox';
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


const MainPage: React.FC<Props> = () => {
	return (
		<StyledDiv>
			<ContentForm>
				<InputTextWrap>
					<span>Liczba miejsc:</span>
					<InputText />
				</InputTextWrap>
				<CheckBoxWrap>
					<Checkbox />
					<span>Czy miejsca mają być obok siebie?</span>
				</CheckBoxWrap>
				<ButtonWrap>
					<Button buttonText={'Wybierz miejsca'} />
				</ButtonWrap>
			</ContentForm>
		</StyledDiv>);
};

export default MainPage;