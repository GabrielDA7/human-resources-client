import React, {memo} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as colors from '../../styles/colors';

const BackButton = ({goBack}) => (
  <TouchableOpacity onPress={goBack} style={styles.container}>
    <Icon name="arrow-left" size={30} color={colors.richBlack} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 20,
    left: 0,
  },
  image: {
    width: 24,
    height: 24,
  },
});

export default memo(BackButton);
