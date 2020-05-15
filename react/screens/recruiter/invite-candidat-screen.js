import React, {useState} from 'react';
import Background from '../../components/background';
import BackButton from '../../components/back-button';
import Logo from '../../components/logo';
import Header from '../../components/header';
import {StyleSheet, Text} from 'react-native';
import TextInput from '../../components/text-input';
import Button from '../../components/button';
import {invite} from '../../../api/offer-client';
import * as colors from '../../../styles/colors';

function InviteCandidatScreen({route, navigation}) {
  const [email, setEmail] = useState({value: '', error: ''});
  const [error, setError] = useState(null);
  const {offerId} = route.params;

  const _onInvitePressed = () => {
    alert(offerId);
    invite({
      email: email.value,
      offerId: offerId,
    })
      .then(() => navigation.navigate('Home'))
      .catch(err => setError(err));
  };

  return (
    <Background>
      <BackButton
        goBack={() => {
          navigation.navigate('Home');
        }}
      />
      <Logo />
      <Header>Invite Candidate</Header>
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

      <Button mode="contained" onPress={_onInvitePressed}>
        Invite
      </Button>
    </Background>
  );
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  error: {
    color: colors.error,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  label: {
    color: colors.text,
  },
  link: {
    fontWeight: 'bold',
    color: colors.primary,
  },
});

export default InviteCandidatScreen;
