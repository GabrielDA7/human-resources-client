import {ScrollView, StyleSheet, Text} from 'react-native';
import React, {useState} from 'react';
import * as colors from '../../../styles/colors';
import {application} from '../../../api/offer-client';
import BackButton from '../../components/back-button';
import Logo from '../../components/logo';
import Header from '../../components/header';
import TextInput from '../../components/text-input';
import Button from '../../components/button';
import Background from '../../components/background';

function ApplicationOffer({navigation}) {
  const [error, setError] = useState(null);
  const [firstname, setFirstname] = useState({value: '', error: ''});
  const [lastname, setLastname] = useState({value: '', error: ''});
  const [gender, setGender] = useState({value: '', error: ''});

  const _onApplyPressed = () => {
    application({firstname, lastname, gender})
      .then(res => navigation.navigate(`Application`, {id: res.id}))
      .catch(err => setError(err));
  };

  return (
    <ScrollView>
      <Background>
        <BackButton
          goBack={() => {
            navigation.navigate('Home');
          }}
        />
        <Header>Invite Candidate</Header>
        {error ? (
          <Text style={styles.error}>
            {error.message ? error.message : error['hydra:title']}
          </Text>
        ) : null}

        <TextInput
          label="Firstname"
          returnKeyType="next"
          value={firstname.value}
          onChangeText={text => setFirstname({value: text, error: ''})}
          error={!!firstname.error}
          errorText={firstname.error}
        />
        <TextInput
          label="Lastname"
          returnKeyType="next"
          value={lastname.value}
          onChangeText={text => setLastname({value: text, error: ''})}
          error={!!lastname.error}
          errorText={lastname.error}
        />
        <TextInput
          label="Gender"
          returnKeyType="next"
          value={gender.value}
          onChangeText={text => setGender({value: text, error: ''})}
          error={!!gender.error}
          errorText={gender.error}
        />

        <Button mode="contained" onPress={_onApplyPressed}>
          Apply
        </Button>
      </Background>
    </ScrollView>
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

export default ApplicationOffer;
