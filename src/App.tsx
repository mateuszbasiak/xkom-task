import React from 'react';
import ChooseSeat from './pages/ChooseSeat/ChooseSeat';
import MainPage from './pages/MainPage/MainPage';
import Summary from './pages/Summary/Summary';
import { Redirect, Route, Switch } from 'react-router';
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
				<Route exact path='/'>
					<MainPage />
				</Route>
				<Route>
					<Redirect to='/' />
				</Route>
			</Switch>
		</BrowserRouter>
	);
};

export default App;
