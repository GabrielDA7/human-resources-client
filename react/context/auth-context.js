import React from 'react';

import * as AppService from '../../services/app-service';
import * as AuthService from '../../services/auth-service';

import * as AuthClient from '../../api/auth-client';

import SpinnerScreen from '../screens/spinner-screen';
import InternalErrorScreen from '../screens/errors/internal-error-screen';

import {useAsync} from '../hooks/async-hook';

const appDataPromise = AppService.bootstrapAppData();
const AuthContext = React.createContext(null);
AuthContext.displayName = 'AuthContext';

function AuthProvider(props) {
  const {
    data,
    status,
    error,
    isLoading,
    isIdle,
    isError,
    isSuccess,
    run,
    setData,
  } = useAsync();

  React.useLayoutEffect(() => {
    run(appDataPromise);
  }, [run]);

  const login = React.useCallback(
    loginForm => AuthClient.login(loginForm).then(user => setData({user})),
    [setData],
  );

  const register = React.useCallback(
    registerForm => AuthClient.register(registerForm),
    [],
  );

  const logout = React.useCallback(() => {
    AuthService.logout();
    setData(null);
  }, [setData]);

  const user = data?.user;

  const providerValue = React.useMemo(() => ({user, login, logout, register}), [
    login,
    logout,
    register,
    user,
  ]);

  if (isLoading || isIdle) {
    return <SpinnerScreen />;
  }

  if (isError) {
    return <InternalErrorScreen error={error} />;
  }

  if (isSuccess) {
    return <AuthContext.Provider value={providerValue} {...props} />;
  }

  throw new Error(`Unhandled status: ${status}`);
}

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}

export {AuthProvider, useAuth};
