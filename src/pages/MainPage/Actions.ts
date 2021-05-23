import { Action } from 'redux';

export type MainPageAction = SetNumberAndConnected | SetMainError;

export interface SetNumberAndConnected extends Action{
    type: 'SET_NUMBER_CONNECTED';
    payload: {
        numSeats: number;
        connected: boolean;
    }
}

export interface SetMainError extends Action{
    type: 'SET_MAIN_ERROR';
    payload: {
        error: boolean;
    }
}

export const setNumberAndConnected = (numSeats: number, connected: boolean): SetNumberAndConnected => {
	return {
		type: 'SET_NUMBER_CONNECTED',
		payload: {
			numSeats,
			connected
		}
	};
};

export const setMainError = (error: boolean): SetMainError => {
	return {
		type: 'SET_MAIN_ERROR',
		payload: {
			error
		}
	};
};