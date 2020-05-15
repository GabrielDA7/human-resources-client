import React from 'react';

import Header from '../../components/header';
import Paragraph from '../../components/paragraph';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {FAB} from 'react-native-paper';
import * as colors from '../../../styles/colors';
import OffersList from '../../components/offers-list';
import {useAuth} from '../../context/auth-context';

function HomeRecruiterScreen({navigation}) {
  const {user} = useAuth();

  return (
    <ImageBackground
      source={require('../../../assets/background_dot.png')}
      resizeMode="repeat"
      style={styles.background}>
      <View>
        <Header>Hello {user.email}</Header>
        <Paragraph>You will find below all the offers you publish</Paragraph>
        <OffersList navigation={navigation} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: colors.primary,
  },
  error: {
    color: colors.error,
    textAlign: 'center',
  },
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.white,
  },
});

export default HomeRecruiterScreen;
