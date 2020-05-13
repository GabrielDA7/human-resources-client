/**
 * @format
 */

import './bootstrap';
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './app';
import {name as appName} from './app.json';
import AppProviders from './react/context/app-context';

function Main() {
  return (
    <AppProviders>
      <App />
    </AppProviders>
  );
}

AppRegistry.registerComponent(appName, () => Main);
