import {client} from '../api/api-client';
import AsyncStorage from '@react-native-community/async-storage';

const storageKey = '__hr_token__';

function handleAuthResponse({token, ...user}) {
  setToken(token);
  return user;
}

function getUser() {
  const token = getToken();
  if (!token) {
    return Promise.resolve(null);
  }
  return client('me', {method: 'GET'}).then(userData => userData);
}

async function getToken() {
  return AsyncStorage.getItem(storageKey)
    .then(res => JSON.parse(res))
    .catch(err => alert(err));
}

async function setToken(token) {
  await AsyncStorage.setItem(storageKey, JSON.stringify(token));
}

async function logout() {
  await AsyncStorage.removeItem(storageKey).then(res => res);
}

function isLoggedIn() {
  return getToken().then(token => Boolean(token));
}

export {getUser, getToken, setToken, logout, isLoggedIn, handleAuthResponse};
