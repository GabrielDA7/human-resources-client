import React from 'react';

import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {AuthProvider} from './auth-context';

function AppProviders({children}) {
  return (
    <NavigationContainer>
      <AuthProvider>
        <PaperProvider>{children}</PaperProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}

export default AppProviders;
