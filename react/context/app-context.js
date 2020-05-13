import React from 'react';

import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';

function AppProviders({children}) {
  return (
    <NavigationContainer>
      <PaperProvider>{children}</PaperProvider>
    </NavigationContainer>
  );
}

export default AppProviders;
