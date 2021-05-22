import React from 'react';
import ChooseSeat from './pages/ChooseSeat/ChooseSeat';
import MainPage from './pages/MainPage/MainPage';
import { State } from './Reducer/Reducer';
import { useAppSelector } from './Reducer/hooks';

const App: React.FC = () => {
	const currPage = useAppSelector((state : State) => state.currPage);
	switch(currPage){
	case 'ChooseSeat':
		return <ChooseSeat />;
	default:
		return <MainPage />;
	}
};

export default App;
