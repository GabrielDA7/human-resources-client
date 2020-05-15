import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import * as colors from '../../../styles/colors';
import {addOffer} from '../../../api/offer-client';
import BackButton from '../../components/back-button';
import Header from '../../components/header';
import TextInput from '../../components/text-input';
import Button from '../../components/button';
import Background from '../../components/background';
import {useAuth} from '../../context/auth-context';

function AddOfferScreen({navigation}) {
  const [error, setError] = useState(null);
  const [token, setToken] = useState({value: '', error: ''});
  const {user} = useAuth();
  const _onPressed = () => {
    addOffer(token.value, user.user_id)
      .then(res => navigation.navigate(`Application`, {id: res.id}))
      .catch(err => setError(err));
  };

  return (
    <Background>
      <BackButton
        goBack={() => {
          navigation.navigate('Home');
        }}
      />
      <Header>Add offer with a Token</Header>
      {error ? (
        <Text style={styles.error}>
          {error.message ? error.message : error['hydra:title']}
        </Text>
      ) : null}
      <TextInput
        label="Token"
        returnKeyType="next"
        value={token.value}
        onChangeText={text => setToken({value: text, error: ''})}
        error={!!token.error}
        errorText={token.error}
        autoCapitalize="none"
      />
      <Button mode="contained" onPress={_onPressed}>
        Add Offer
      </Button>
    </Background>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.white,
  },
  error: {
    color: colors.error,
  },
});

export default AddOfferScreen;
