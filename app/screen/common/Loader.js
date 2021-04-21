import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {color as colors, normalize} from '../../helper/themeHelper';
export const Loading = props => {
  const {size = 'large', color = colors.blue, isLoading} = props;
  if (isLoading) {
    return (
      <View style={[style.container]}>
        <ActivityIndicator size={size} color={color} animating={isLoading} />
      </View>
    );
  } else {
    return null;
  }
};
const style = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 1000,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: normalize(15),
    fontWeight: 'bold',
    color: colors.blue,
  },
});
