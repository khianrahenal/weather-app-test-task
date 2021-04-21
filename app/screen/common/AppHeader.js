import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {
  hp,
  normalize,
  wp,
  color,
  font,
  isANDROID,
} from '../../helper/themeHelper';
import SafeAreaView from 'react-native-safe-area-view';
import {BACK_ARROW} from '../../asset/images';

const AppHeader = props => {
  const {title, requireGoBack = false, onPressBackArrow = null} = props;
  const {container, textStyle} = style;
  return (
    <SafeAreaView
      style={{backgroundColor: '#00804A'}}
      forceInset={{top: 'always', bottom: 'never'}}>
      <View style={[container]}>
        {requireGoBack && (
          <TouchableOpacity style={{flex: 1}} onPress={onPressBackArrow}>
            <Image
              source={require('../../asset/images/arrow.png')}
              style={{
                height: hp(3),
                width: hp(3),
              }}
            />
          </TouchableOpacity>
        )}
        <Text
          allowFontScaling={false}
          style={[
            textStyle,
            {
              fontWeight: '700',
              lineHeight: normalize(20) * 1.2,
              flex: 10,
            },
          ]}>
          {title}
        </Text>
      </View>
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
  container: {
    height: hp(8),
    // backgroundColor: color.themePurple,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: wp(5),
  },
  containerGradient: {
    height: hp(8),
    // backgroundColor: color.blue,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: wp(5),
    marginTop: hp(7),
  },
  textStyle: {
    color: color.white,
    textAlign: 'center',
    fontSize: normalize(20),
  },
  backHeaderTextStyle: {
    color: color.white,
    fontFamily: font.robotoBold,
    fontSize: normalize(22),
  },
  logoView: {
    position: 'absolute',
    height: hp(40),
    width: hp(40),
    borderRadius: hp(12.5),
    borderWidth: hp(1.7),
    borderColor: color.lightBlue,
    backgroundColor: color.white,
    overflow: 'hidden',
    resizeMode: 'stretch',
    bottom: isANDROID ? hp(-7) : hp(-6),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },

  cancelButton: {
    alignSelf: 'flex-start',
    marginTop: hp(1),
    marginLeft: wp(4),
  },
  backArrowIcon: {
    height: hp(1),
    width: hp(1),
  },
});

export {AppHeader};
