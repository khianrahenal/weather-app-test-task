import React, {useState, useEffect} from 'react';
import {
  NativeModules,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {normalize, hp, wp} from '../../helper/themeHelper';
import {
  getCityListForWeather,
  getCurrentLocationWehather,
} from '../../redux/action/weatherAction';
import {AppHeader} from '../common/AppHeader';
import {getCurrentLocation} from '../../helper/locationHelper';
import {setLoaderStatus} from '../../redux/action/appAction';
const {NotificationService} = NativeModules;
const HomeScreen = props => {
  const isLoading = useSelector(
    state => state.appDefaultSettingReducer.isLoading,
  );
  const cityList = useSelector(state => state.weatherReducer.cityList);
  const dispatch = useDispatch();
  const defaultLatLong = {lat: '23.68', lon: '90.35'};
  const [currentLatLong, setCurrentLatLong] = useState({...defaultLatLong});

  useEffect(() => {
    dispatch(setLoaderStatus(true));
    getCurrentLocation()
      .then(async location => {
        dispatch(setLoaderStatus(false));
        if (location) {
          setCurrentLatLong({...location});
        } else {
          setCurrentLatLong({...defaultLatLong});
        }
        dispatch(getCurrentLocationWehather(currentLatLong)).then(
          locationWeatherData => {
            NotificationService.startService(
              locationWeatherData?.weather[0].icon,
              parseInt(locationWeatherData?.main?.temp) / 10 + ' °C',
            );
          },
        );
      })
      .catch(async err => {
        dispatch(setLoaderStatus(false));
        await dispatch(getCityListForWeather(currentLatLong));
        dispatch(getCurrentLocationWehather(currentLatLong)).then(
          locationWeatherData => {
            NotificationService.startService(
              locationWeatherData?.weather[0].icon,
              parseInt(locationWeatherData?.main?.temp) / 10 + ' °C',
            );
          },
        );
      });
  }, []);

  useEffect(() => {
    dispatch(setLoaderStatus(true));
    getCurrentLocation()
      .then(async location => {
        dispatch(setLoaderStatus(false));
        if (location) {
          setCurrentLatLong({...location});
        } else {
          setCurrentLatLong({...defaultLatLong});
        }
        await dispatch(getCityListForWeather(currentLatLong));
      })
      .catch(async err => {
        dispatch(setLoaderStatus(false));
        await dispatch(getCityListForWeather(currentLatLong));
      });
  }, []);

  const moveToMapViewScreen = data => {
    props.navigation.navigate('MapScreen', {
      cityName: data.item.name,
      weaterTitle: data.item.weather[0].main,
      humadity: data.item.main.humidity,
      windSpeed: data.item.wind.speed,
      maxTemp: parseInt(data.item.main.temp_max) / 10,
      minTemp: parseInt(data.item.main.temp_min) / 10,
      temp: parseInt(data.item.main.temp) / 10,
      icon: data.item.weather[0].icon,
      coords: data.item.coord,
    });
  };

  const renderRow = (data, index) => {
    return (
      <TouchableOpacity onPress={() => moveToMapViewScreen(data)}>
        <View key={index} style={style.listMainContainer}>
          <View style={{paddingTop: hp(1)}}>
            <Text style={style.cityName}>{data.item.name}</Text>
            <Text style={style.weatherMain}>{data.item.weather[0].main}</Text>
          </View>
          <View>
            <Text style={style.cityTemprature}>
              {parseInt(data.item.main.temp) / 10}
              <Text style={[style.cityTemprature, {fontSize: normalize(16)}]}>
                {' °C'}
              </Text>
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1}}>
      {/*{isLoading && <Loading isLoading={isLoading} />}*/}
      <AppHeader title={'Weather App'} />
      {cityList.length === 0 ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>Please wait data is loading....</Text>
        </View>
      ) : (
        <FlatList
          numColumns={1}
          data={cityList}
          showsVerticalScrollIndicator={true}
          showsHorizontalScrollIndicator={true}
          renderItem={renderRow}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
};
const style = StyleSheet.create({
  listMainContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: hp(1.5),
    borderBottomWidth: hp(0.04),
  },
  cityName: {
    fontSize: normalize(15),
    fontWeight: '700',
    color: '#6F6F6F',
  },
  weatherMain: {
    fontSize: normalize(13),
    marginTop: hp(1),
    color: '#6F6F6F',
  },
  cityTemprature: {
    fontSize: normalize(20),
    paddingRight: wp(5),
    fontWeight: '700',
    color: '#6F6F6F',
  },
});
export default HomeScreen;
