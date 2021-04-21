import {appDefaultReducer} from './defaultReducer';
import {GET_CITY_LIST} from '../types';
const INITIAL_STATE = appDefaultReducer.weatherReducer;

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_CITY_LIST: {
      return {
        ...state,
        cityList: action.payload,
      };
    }
    default:
      return state;
  }
};
