import React from 'react';

import LoginScreen from './react/screens/login-screen';
import RegisterScreen from './react/screens/register-screen';
import UnauthentifiedHomeScreen from './react/screens/unauthentified-home-screen';
import {createStackNavigator} from '@react-navigation/stack';
import ConfirmRegistrationScreen from './react/screens/confirm-registration-screen';

const Stack = createStackNavigator();

function UnauthenticatedApp() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Confirm" component={ConfirmRegistrationScreen} />
      <Stack.Screen name="Home" component={UnauthentifiedHomeScreen} />
    </Stack.Navigator>
  );
}

export default UnauthenticatedApp;
