import React, {useState} from 'react';
import BackButton from '../../components/back-button';
import Logo from '../../components/logo';
import Header from '../../components/header';
import {StyleSheet, Text, ScrollView, View} from 'react-native';
import TextInput from '../../components/text-input';
import Button from '../../components/button';
import Background from '../../components/background';
import * as colors from '../../../styles/colors';
import DatePicker from 'react-native-date-picker';
import {createOffer} from '../../../api/offer-client';

function CreateOfferScreen({navigation}) {
  const [name, setName] = useState({value: '', error: ''});
  const [companyDescription, setCompanyDescription] = useState({
    value: '',
    error: '',
  });
  const [description, setDescription] = useState({value: '', error: ''});
  const [date, setDate] = useState({value: new Date(), error: ''});
  const [type, setType] = useState({value: '', error: ''});
  const [location, setLocation] = useState({value: '', error: ''});
  const [error, setError] = useState(null);
  const [nextStep, setNextStep] = useState(false);

  const _onCreatePressed = () => {
    createOffer({
      name: name.value,
      companyDescription: companyDescription.value,
      description: description.value,
      date: date.value,
      type: type.value,
      location: location.value,
    })
      .then(res => navigation.navigate('Invite', {offerId: res.id}))
      .catch(err => setError(err));
  };

  function secondStep() {
    return (
      <>
        <TextInput
          label="Type"
          returnKeyType="next"
          value={type.value}
          onChangeText={text => setType({value: text, error: ''})}
          error={!!type.error}
          errorText={type.error}
        />
        <TextInput
          label="Location"
          returnKeyType="next"
          value={location.value}
          onChangeText={text => setLocation({value: text, error: ''})}
          error={!!location.error}
          errorText={location.error}
        />

        <Button mode="outlined" onPress={() => setNextStep(false)}>
          Back
        </Button>
        <Button mode="contained" onPress={() => _onCreatePressed()}>
          Create
        </Button>
      </>
    );
  }

  function firstStep() {
    return (
      <>
        <TextInput
          label="Name"
          returnKeyType="next"
          value={name.value}
          onChangeText={text => setName({value: text, error: ''})}
          error={!!name.error}
          errorText={name.error}
        />
        <TextInput
          label="Company description"
          returnKeyType="next"
          value={companyDescription.value}
          onChangeText={text => setCompanyDescription({value: text, error: ''})}
          error={!!companyDescription.error}
          errorText={companyDescription.error}
        />
        <TextInput
          label="Description"
          returnKeyType="next"
          value={description.value}
          onChangeText={text => setDescription({value: text, error: ''})}
          error={!!description.error}
          errorText={description.error}
        />
        <DatePicker
          date={date.value}
          onDateChange={d => setDate({value: d, error: ''})}
        />
        <Button mode="contained" onPress={() => setNextStep(true)}>
          Next
        </Button>
      </>
    );
  }

  return (
    <ScrollView>
      <Background>
        <BackButton
          goBack={() => {
            navigation.navigate('Home');
          }}
        />
        <Header>Create an offer.</Header>
        {error ? (
          <Text style={styles.error}>
            {error.message ? error.message : error['hydra:title']}
          </Text>
        ) : null}
        {nextStep ? secondStep() : firstStep()}
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

export default CreateOfferScreen;
