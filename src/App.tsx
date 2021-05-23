import React from 'react';
import ChooseSeat from './pages/ChooseSeat/ChooseSeat';
import MainPage from './pages/MainPage/MainPage';
import Summary from './pages/Summary/Summary';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path='/chooseseat'>
					<ChooseSeat />
				</Route>
				<Route exact path='/summary'>
					<Summary />
				</Route>
				<Route>
					<MainPage />
				</Route>
			</Switch>
		</BrowserRouter>
	);
};

export default App;
