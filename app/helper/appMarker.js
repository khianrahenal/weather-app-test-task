import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {color, hp, wp} from '../helper/themeHelper';
import {MAP_PIN} from '../asset/images';

const CurrentLocationMarker = ({outerViewEnable, angle}) => {
  let _angle = parseInt(angle);
  return outerViewEnable ? (
    <View style={[styles.currentMarkerContainer]}>
      {/*<FontAwesome name={'location-arrow'} color={color.sky} size={hp(10)} />*/}
      <Image source={MAP_PIN} style={{width: wp(10), height: hp(20)}} />
      <View style={styles.currentMarker} />
    </View>
  ) : (
    <Image source={MAP_PIN} style={{width: hp(5), height: hp(5)}} />
  );
};
const styles = StyleSheet.create({
  currentMarker: {
    borderColor: color.white,
    borderWidth: wp(0.7),
    width: wp(5),
    height: wp(5),
    backgroundColor: color.sky,
    borderRadius: 100,
  },
  currentMarkerContainer: {
    // backgroundColor: 'rgba(53, 218, 215, 0.35)',
    borderRadius: 100,
    padding: wp(7),
  },
  destMarkerInnerCircle: {
    height: hp(2),
    width: hp(2),
    borderRadius: hp(1),
    backgroundColor: '#000',
    borderWidth: hp(0.1),
    borderColor: 'white',
  },

  destMarkerContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 200,
  },
  destMarker: {
    borderColor: color.white,
    borderWidth: wp(0.7),
    width: wp(6),
    height: wp(6),
    backgroundColor: color.black,
    borderRadius: 100,
  },
  destMarkerForOutterCircle: {
    borderColor: '#A5BDBDFF',
    borderWidth: wp(0.7),
    width: wp(9),
    height: wp(9),
    backgroundColor: '#A5BDBD80',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  liveLocation: {
    width: hp(5.5),
    height: hp(5.5),
  },
});
export {CurrentLocationMarker}
