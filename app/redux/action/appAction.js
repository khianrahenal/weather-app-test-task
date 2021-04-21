import {LOADING} from '../types';

export const setLoaderStatus = (status) => {
    return (dispatch) => {
        dispatch({ type: LOADING, payload: status });
    };
};
