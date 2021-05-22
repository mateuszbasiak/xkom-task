export const MainPageActionTypes = ['SET_NUMBER_CONNECTED',  'SET_MAIN_ERROR'];
export type MainPageAction = SetNumberAndConnected | SetMainError;

export interface SetNumberAndConnected{
    type: 'SET_NUMBER_CONNECTED';
    payload: {
        numSeats: number;
        connected: boolean;
    }
}

export interface SetMainError{
    type: 'SET_MAIN_ERROR';
    payload: {
        error: boolean;
    }
}