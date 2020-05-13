import {client} from '../api/api-client';
import AsyncStorage from '@react-native-community/async-storage';

const storageKey = '__hr_token__';

function handleAuthResponse({token, ...user}) {
  setToken(token).then(r => r);
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
  return await AsyncStorage.getItem(storageKey);
}

async function setToken(token) {
  await AsyncStorage.setItem(storageKey, token);
}

async function logout() {
  await AsyncStorage.removeItem(storageKey);
}

function isLoggedIn() {
  return Boolean(getToken());
}

export {getUser, getToken, setToken, logout, isLoggedIn, handleAuthResponse};
