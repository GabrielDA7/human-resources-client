import React, {memo, useState} from 'react';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';

import * as colors from '../../styles/colors';

import Background from '../components/background';
import Logo from '../components/logo';
import Header from '../components/header';
import Button from '../components/button';
import BackButton from '../components/back-button';
import TextInput from '../components/text-input';

import {useAsync} from '../hooks/async-hook';
import {useAuth} from '../context/auth-context';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const {login} = useAuth();
  const {isError, error, run} = useAsync();

  const _onLoginPressed = () => {
    run(
      login({
        email: email.value,
        password: password.value,
      }),
    );
  };

  return (
    <Background>
      <BackButton
        goBack={() => {
          navigation.navigate('Home');
        }}
      />
      <Logo />
      <Header>Welcome back.</Header>
      {isError ? (
        <Text style={styles.error}>
          {error.message ? error.message : error['hydra:title']}
        </Text>
      ) : null}
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({value: text, error: ''})}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({value: text, error: ''})}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <Button mode="contained" onPress={_onLoginPressed}>
        Login
      </Button>
      <View style={styles.row}>
        <Text style={styles.label}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.link}>Register</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  error: {
    color: colors.error,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  label: {
    color: colors.text,
  },
  link: {
    fontWeight: 'bold',
    color: colors.primary,
  },
});

export default memo(LoginScreen);
