import React from 'react';

import {View, Text} from 'react-native';

function InternalErrorPage(error) {
  return (
    <View>
      <Text>Uh oh, broken. Try to refresh the App.</Text>
      <Text>{error.message}</Text>
    </View>
  );
}

export default InternalErrorPage;
