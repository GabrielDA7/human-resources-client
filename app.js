/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {StatusBar} from 'react-native';

import SpinnerScreen from './react/screens/spinner-screen';
import {useAuth} from './react/context/auth-context';
import AuthenticatedApp from './authenticated-app';
import UnauthenticatedApp from './unauthenticated-app';

const App: () => React$Node = () => {
  const {user} = useAuth();
  return (
    <>
      <React.Suspense fallback={<SpinnerScreen />}>
        <StatusBar barStyle="dark-content" />
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </React.Suspense>
    </>
  );
};

export default App;
