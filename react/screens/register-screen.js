import React, {memo, useState} from 'react';

import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import Background from '../components/background';
import Logo from '../components/logo';
import Header from '../components/header';
import Button from '../components/button';
import TextInput from '../components/text-input';
import BackButton from '../components/back-button';

import * as colors from '../../styles/colors';

import {useAuth} from '../context/auth-context';
import {Checkbox, TouchableRipple} from 'react-native-paper';

const RegisterScreen = ({navigation}: Props) => {
  const [email, setEmail] = useState({value: '', error: ''});
  const [error, setError] = useState(null);
  const [checked, setChecked] = useState(false);
  const [password, setPassword] = useState({value: '', error: ''});

  const {register} = useAuth();

  const _onSignUpPressed = () => {
    const roles = [checked ? 'ROLE_RECRUITER' : 'ROLE_USER'];
    register({
      email: email.value,
      password: password.value,
      roles: roles,
    })
      .then(() => navigation.navigate('Confirm'))
      .catch(err => {
        setError(err);
      });
  };

  return (
    <Background>
      <BackButton goBack={() => navigation.navigate('Home')} />

      <Logo />

      <Header>Create Account</Header>
      {error ? (
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

      <View style={styles.rowCheck}>
        <View style={styles.checkboxContainer}>
          <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            color={colors.primary}
            onPress={() => (checked ? setChecked(false) : setChecked(true))}
          />
        </View>
        <Text style={styles.labelCheck}>Recruiter</Text>
      </View>

      <Button mode="contained" onPress={_onSignUpPressed} style={styles.button}>
        Sign Up
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 48,
  },
  rowCheck: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxContainer: {
    paddingRight: 8,
  },
  labelCheck: {
    flex: 1,
    flexWrap: 'wrap',
    color: colors.text,
  },
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

export default memo(RegisterScreen);
