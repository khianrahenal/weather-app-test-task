import {GET_CITY_LIST, LOADING} from '../types';
import axios from 'axios';
import {API_KEY} from '../../helper/constant';

export const getCityListForWeather = currentLatLong => {
  return dispatch => {
    dispatch({type: LOADING, payload: true});
    const url =
      'http://api.openweathermap.org/data/2.5/find?lat=' +
      currentLatLong.lat +
      '&lon=' +
      currentLatLong.lon +
      '&cnt=50&appid=' +
      API_KEY;
    return axios.get(url).then(res => {
      dispatch({type: LOADING, payload: false});
      dispatch({type: GET_CITY_LIST, payload: res.data.list});
      return Promise.resolve(res);
    });
  };
};

export const getCurrentLocationWehather = currentLatLong => {
  return dispatch => {
    const url =
      'http://api.openweathermap.org/data/2.5/weather?lat=' +
      currentLatLong.lat +
      '&lon=' +
      currentLatLong.lon +
      '&appid=' +
      API_KEY;
    return axios.get(url).then(res => {
      return Promise.resolve(res.data);
    });
  };
};
