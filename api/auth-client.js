import {client} from './api-client';

import {handleAuthResponse} from '../services/auth-service';

function login({email, password}) {
  return client('authentication_token', {
    body: {email, password},
    method: 'POST',
  }).then(handleAuthResponse);
}

function confirm({confirmationToken}) {
  return client(`users/confirm/${confirmationToken}`, {
    method: 'GET',
  });
}

function register({email, password, roles}) {
  return client('users', {
    body: {email, password, roles},
    method: 'POST',
  });
}

export {login, register, confirm};
