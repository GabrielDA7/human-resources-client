import {client} from './api-client';

import {handleAuthResponse} from '../services/auth-service';

function login({email, password}) {
  return client('login', {body: {email, password}, method: 'POST'}).then(
    handleAuthResponse,
  );
}

function register({email, password}) {
  return client('register', {body: {email, password}, method: 'POST'});
}

export {login, register};
