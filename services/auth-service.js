import {client} from '../api/api-client';
import AsyncStorage from '@react-native-community/async-storage';
import jwt from 'jwt-decode';

const storageKey = '__hr_token__';

async function handleAuthResponse({token, ...data}) {
  await setToken(token);
  return data['user'];
}

async function getUser() {
  const token = await getToken();

  if (!token) {
    return Promise.resolve(null);
  }

  return jwt(token);
}

async function getToken() {
  return AsyncStorage.getItem(storageKey).then(res => JSON.parse(res));
}

async function setToken(token) {
  await AsyncStorage.setItem(storageKey, JSON.stringify(token));
}

async function logout() {
  await AsyncStorage.removeItem(storageKey);
}

function isLoggedIn() {
  return getToken().then(token => Boolean(token));
}

export {getUser, getToken, setToken, logout, isLoggedIn, handleAuthResponse};
