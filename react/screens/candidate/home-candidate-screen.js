import React, {useState, useEffect} from 'react';

import {DataTable, FAB} from 'react-native-paper';
import {myOffers} from '../../../api/offer-client';
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';
import * as colors from '../../../styles/colors';
import Header from '../../components/header';
import {useAuth} from '../../context/auth-context';
import Paragraph from '../../components/paragraph';

function HomeCandidateScreen({navigation}) {
  const [data, setData] = useState({offers: [], totalItems: 1});
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const {user} = useAuth();

  useEffect(() => {
    myOffers(page)
      .then(result =>
        setData({
          offers: result['hydra:member'],
          totalItems: result['hydra:totalItems'],
        }),
      )
      .catch(err => setError(err));
  }, [page]);

  return (
    <ImageBackground
      source={require('../../../assets/background_dot.png')}
      resizeMode="repeat"
      style={styles.background}>
      <View>
        <Header>Hello {user.email}</Header>
        <Paragraph>
          You will find below all the offers you applied for
        </Paragraph>
        {error ? (
          <Text style={styles.error}>
            {error.message ? error.message : error['hydra:title']}
          </Text>
        ) : null}
        {data['totalItems'] > 0 ? (
          <DataTable>
            <DataTable.Header>
              <DataTable.Title date>Date</DataTable.Title>
              <DataTable.Title>Name</DataTable.Title>
              <DataTable.Title>Type</DataTable.Title>
              <DataTable.Title>Status</DataTable.Title>
            </DataTable.Header>
            {data['offers'].map(item => {
              return (
                <TouchableHighlight
                  underlayColor={colors.primary}
                  onPress={item => navigation.navigate('Offer')}>
                  <DataTable.Row>
                    <DataTable.Cell>{item.date}</DataTable.Cell>
                    <DataTable.Cell>{item.name}</DataTable.Cell>
                    <DataTable.Cell>{item.type}</DataTable.Cell>
                    <DataTable.Cell>pending</DataTable.Cell>
                  </DataTable.Row>
                </TouchableHighlight>
              );
            })}
            <DataTable.Pagination
              page={page}
              onPageChange={currentPage => {
                setPage(currentPage);
              }}
              numberOfPages={data['totalItems']}
              label={`${page.toString()} of ${data['totalItems'].toString()}`}
            />
          </DataTable>
        ) : (
          <Text style={{textAlign: 'center', fontSize: 24}}>No offers</Text>
        )}
      </View>
      <FAB
        style={styles.fab}
        small
        icon="plus"
        onPress={() => navigation.navigate('AddOffer')}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: colors.primary,
  },
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

export default HomeCandidateScreen;
