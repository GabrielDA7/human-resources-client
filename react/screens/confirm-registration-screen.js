import React, {memo, useState} from 'react';

import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import Background from '../components/background';
import Logo from '../components/logo';
import Header from '../components/header';
import Button from '../components/button';
import TextInput from '../components/text-input';
import BackButton from '../components/back-button';

import * as colors from '../../styles/colors';

import {confirm} from '../../api/auth-client';

const ConfirmRegistrationScreen = ({navigation}: Props) => {
  const [confirmationToken, setConfirmationToken] = useState({
    value: '',
    error: '',
  });
  const [error, setError] = useState(null);

  const _onConfirmPressed = () => {
    confirm({
      confirmationToken: confirmationToken.value,
    })
      .then(() => navigation.navigate('Login'))
      .catch(err => setError(err));
  };

  return (
    <Background>
      <BackButton goBack={() => navigation.navigate('Register')} />

      <Logo />

      <Header>Confirm Account</Header>
      {error ? (
        <Text style={styles.error}>
          {error.message ? error.message : error['hydra:title']}
        </Text>
      ) : null}

      <TextInput
        label="Confirmation token"
        returnKeyType="next"
        value={confirmationToken.value}
        onChangeText={text => setConfirmationToken({value: text, error: ''})}
        error={!!confirmationToken.error}
        errorText={confirmationToken.error}
        autoCapitalize="none"
      />

      <Button
        mode="contained"
        onPress={_onConfirmPressed}
        style={styles.button}>
        Confirm
      </Button>
    </Background>
  );
};

const styles = StyleSheet.create({
  label: {
    color: colors.text,
  },
  button: {
    marginTop: 24,
  },
  error: {
    color: colors.error,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: colors.primary,
  },
});

export default memo(ConfirmRegistrationScreen);
