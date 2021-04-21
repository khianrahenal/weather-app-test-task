import Geolocation from 'react-native-geolocation-service';
import {LATITUDE_DELTA, LONGITUDE_DELTA} from './constant';

export const getCurrentLocation = () => {
  return new Promise(resolve => {
    try {
      Geolocation.getCurrentPosition(
        info => {
          const initRoute = {
            lat: parseFloat(info.coords.latitude),
            lon: parseFloat(info.coords.longitude),
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          };
          console.log(initRoute)
          return resolve(initRoute);
        },
        error => {
          console.log('error---', error);
          return resolve(false);
        },
        {enableHighAccuracy: true, timeout: 5000, maximumAge: 1000},
      );
    } catch (e) {
      console.log(e.getMessages());
      return resolve(false);
    }
  });
};
