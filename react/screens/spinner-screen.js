import React from 'react';

import {View, Text} from 'react-native';
import * as colors from '../../styles/colors';

import {ActivityIndicator} from 'react-native-paper';

function SpinnerScreen() {
  return (
    <View>
      <ActivityIndicator
        style={{
          flex: 1,
          width: '100%',
          backgroundColor: colors.white,
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        animating={true}
        color={colors.primary}
      />
    </View>
  );
}

export default SpinnerScreen;
