import React, {useRef} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {AppHeader} from '../common/AppHeader';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {LATITUDE_DELTA, LONGITUDE_DELTA} from '../../helper/constant';
import {CurrentLocationMarker} from '../../helper/appMarker';
import {hp, normalize, wp} from '../../helper/themeHelper';
const MapViewScreen = props => {
  const mapRef = useRef(null);
  // console.log(props.route.params)

  const {
    coords,
    cityName,
    humadity,
    icon,
    maxTemp,
    minTemp,
    temp,
    weaterTitle,
    windSpeed,
  } = props.route.params;
  const initialLocation = {
    latitude: coords.lat,
    longitude: coords.lon,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };
  const iconUrl = 'http://openweathermap.org/img/w/' + icon + '.png';
  return (
    <View style={{flex: 1}}>
      <AppHeader
        onPressBackArrow={() => {
          props.navigation.goBack();
        }}
        requireGoBack={true}
        title={'Weather App'}
      />

      <View style={{height: hp(70)}}>
        <MapView
          ref={mapRef}
          initialRegion={initialLocation}
          region={initialLocation}
          provider={PROVIDER_GOOGLE}
          zoomEnabled={true}
          zoomControlEnabled={true}
          style={{
            flex: 1,
          }}>
          <Marker coordinate={initialLocation}>
            <CurrentLocationMarker />
          </Marker>
        </MapView>
      </View>
      <View style={{height: hp(25), flexDirection: 'row'}}>
        <View style={{flex: 1, padding: hp(1)}}>
          <Text style={style.cityNameStyle}>{cityName}</Text>
          <Text style={style.valueStyle}>{weaterTitle}</Text>
          <Text style={style.valueStyle}>Humidity: {humadity}</Text>
          <Text style={style.valueStyle}>Wind Speed: {windSpeed}</Text>
          <Text style={style.valueStyle}>
            Max Temp: {maxTemp}
            <Text style={[style.valueStyle, {fontSize: normalize(10)}]}>
              {' '}
              {' °C'}
            </Text>
          </Text>
          <Text style={style.valueStyle}>
            Min Temp: {minTemp}
            <Text style={[style.valueStyle, {fontSize: normalize(10)}]}>
              {' '}
              {' °C'}
            </Text>
          </Text>
        </View>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={[style.cityNameStyle]}>
            {temp}
            <Text style={[style.valueStyle, {fontSize: normalize(13)}]}>
              {' '}
              {' °C'}
            </Text>
          </Text>
          <Image
            resizeMode={'contain'}
            source={{uri: iconUrl}}
            style={style.weatherIcon}
          />
        </View>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  cityNameStyle: {
    fontSize: normalize(15),
    fontWeight: '700',
    color: '#6F6F6F',
  },
  valueStyle: {
    fontSize: normalize(13),
    color: '#6F6F6F',
    // marginVertical: hp(0.5),
  },
  weatherIcon: {
    height: hp(14),
    width: hp(14),
  },
});
export default MapViewScreen;
