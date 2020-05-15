import React, {useState, useCallback} from 'react';
import Header from '../components/header';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';

import * as colors from '../../styles/colors';
import {useFocusEffect} from '@react-navigation/core';
import {get} from '../../api/offer-client';
import {List} from 'react-native-paper';

function OfferScreen({route, navigation}) {
  const [error, setError] = useState(null);
  const [offer, setOffer] = useState({});
  const {offerId} = route.params;

  useFocusEffect(
    useCallback(() => {
      get(offerId)
        .then(res => setOffer(res))
        .catch(err => setError(err));
    }, [offerId]),
  );

  return (
    <ImageBackground
      source={require('../../assets/background_dot.png')}
      resizeMode="repeat"
      style={styles.background}>
      <View>
        <Header>Offer details</Header>
        {error ? (
          <Text style={styles.error}>
            {error.message ? error.message : error['hydra:title']}
          </Text>
        ) : null}
        <Text>Name : {offer?.name}</Text>
        <Text>Company description: {offer?.companyDescription}</Text>
        <Text>Description : {offer?.description}</Text>
        <Text>Date : {offer?.date}</Text>
        <Text>Type : {offer?.type}</Text>
        <Text>Location : {offer?.location}</Text>
        <Text>Created by : {offer?.owner?.email}</Text>
      </View>
      <ScrollView>
        <List.Section>
          <List.Accordion title="Candidates" expanded={true}>
            {offer.invitations
              ? offer.invitations.map((item, i) => {
                  return <List.Item key={i} title={item.token} />;
                })
              : null}
          </List.Accordion>
        </List.Section>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  error: {
    color: colors.error,
    textAlign: 'center',
  },
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.white,
  },
});

export default OfferScreen;
