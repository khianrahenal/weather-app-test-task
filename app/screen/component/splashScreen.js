import React, {useEffect, useState, useCallback} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {
  hp,
  color,
  wp,
  isIOS,
  isANDROID,
  normalize,
} from '../../helper/themeHelper';
import {CommonActions} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
const SplashScreens = props => {
  const {container} = style;
  useEffect(() => {
    if (isIOS) {
      setTimeout(() => {
        SplashScreen.hide();
      }, 2000);
    }
    if (isANDROID) {
      setTimeout(() => {
        SplashScreen.hide();
      }, 300);
    }
    props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'HomeScreen'}],
      }),
    );
  }, []);
  const renderSplashScreen = () => {
    return <Text style={style.textStyle}>Weather App</Text>;
  };
  // return <View />;
  return <View style={[container]}>{renderSplashScreen()}</View>;
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.white,
  },
  logoStyle: {
    height: wp(79.6),
    width: wp(79.6),
  },
  textStyle: {
    color: '#00804A',
    fontSize: normalize(22),
    fontWeight: '500',
  },
});
export default SplashScreens;
