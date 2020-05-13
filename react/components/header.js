import React, {memo} from 'react';
import {StyleSheet, Text} from 'react-native';
import * as colors from '../../styles/colors';

const Header = ({children}) => <Text style={styles.header}>{children}</Text>;

const styles = StyleSheet.create({
  header: {
    fontSize: 26,
    color: colors.primary,
    fontWeight: 'bold',
    paddingVertical: 14,
  },
});

export default memo(Header);
