import {ImageBackground, StyleSheet, Text} from 'react-native';
import React, {useState} from 'react';
import * as colors from '../../../styles/colors';
import {application} from '../../../api/offer-client';

function ApplicationOffer({navigation}) {
  const [error, setError] = useState(null);
  const [firstname, setFirstname] = useState({value: '', error: ''});
  const [lastname, setLastname] = useState({value: '', error: ''});
  const [gender, setGender] = useState({value: '', error: ''});
  const [picture, setPicture] = useState({value: '', error: ''});
  const [age, setAge] = useState({value: '', error: ''});
  const [adress, setAdress] = useState({value: '', error: ''});
  const [motivation, setMotivation] = useState({value: '', error: ''});
  const [salary, setSalary] = useState({value: '', error: ''});
  const [cv, setCv] = useState({value: '', error: ''});

  const _onApplyPressed = () => {
    application({firstname, lastname, motivation, gender})
      .then(res => navigation.navigate(`Application`, {id: res.id}))
      .catch(err => setError(err));
  };

  return (
    <ImageBackground
      source={require('../../../assets/background_dot.png')}
      resizeMode="repeat"
      style={styles.background}>
      {error ? (
        <Text style={styles.error}>
          {error.message ? error.message : error['hydra:title']}
        </Text>
      ) : null}
    </ImageBackground>
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
