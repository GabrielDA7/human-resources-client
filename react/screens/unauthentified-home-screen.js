import React from 'react';

import Logo from '../components/logo';
import Header from '../components/header';
import Paragraph from '../components/paragraph';
import Button from '../components/button';
import Background from '../components/background';

function UnauthentifiedHomeScreen({navigation}) {
  return (
    <Background>
      <Logo />
      <Header>Human Resources</Header>

      <Paragraph>Recruit your next genius.</Paragraph>
      <Button mode="contained" onPress={() => navigation.navigate('Login')}>
        Login
      </Button>
      <Button mode="outlined" onPress={() => navigation.navigate('Register')}>
        Sign Up
      </Button>
    </Background>
  );
}

export default UnauthentifiedHomeScreen;
