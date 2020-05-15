import React, {memo} from 'react';
import {StyleSheet, Text} from 'react-native';
import * as colors from '../../styles/colors';

const Paragraph = ({children}) => <Text style={styles.text}>{children}</Text>;

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    lineHeight: 26,
    color: colors.text,
    textAlign: 'left',
    marginBottom: 14,
  },
});

export default memo(Paragraph);
