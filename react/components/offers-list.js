import React, {useEffect, useState} from 'react';
import {myOffers} from '../../api/offer-client';

import {
  StyleSheet,
  Text,
  TouchableHighlight,
  ScrollView,
  View,
} from 'react-native';

import {DataTable} from 'react-native-paper';
import * as colors from '../../styles/colors';
import {useFocusEffect} from '@react-navigation/core';

function OffersList({navigation}) {
  const [data, setData] = useState({offers: [], totalItems: 1});
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);

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

  useFocusEffect(
    React.useCallback(() => {
      myOffers()
        .then(result =>
          setData({
            offers: result['hydra:member'],
            totalItems: result['hydra:totalItems'],
          }),
        )
        .catch(err => setError(err));
    }, []),
  );

  return (
    <View>
      {error ? (
        <Text style={styles.error}>
          {error.message ? error.message : error['hydra:title']}
        </Text>
      ) : null}
      {data['totalItems'] > 0 ? (
        <DataTable style={styles.datatable}>
          <DataTable.Header>
            <DataTable.Title date>Date</DataTable.Title>
            <DataTable.Title>Name</DataTable.Title>
            <DataTable.Title>Type</DataTable.Title>
          </DataTable.Header>
          <ScrollView>
            {data['offers'].map((item, i) => {
              return (
                <TouchableHighlight
                  key={i}
                  underlayColor={colors.primary}
                  onPress={() =>
                    navigation.navigate('Offer', {offerId: item.id})
                  }>
                  <DataTable.Row>
                    <DataTable.Cell>{item.date}</DataTable.Cell>
                    <DataTable.Cell>{item.name}</DataTable.Cell>
                    <DataTable.Cell>{item.type}</DataTable.Cell>
                  </DataTable.Row>
                </TouchableHighlight>
              );
            })}
          </ScrollView>
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
  );
}

const styles = StyleSheet.create({
  datatable: {
    maxHeight: 400,
  },
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

export default OffersList;
