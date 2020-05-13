import * as AuthService from '../services/auth-service';

async function client(endpoint, {body, ...customConfig} = {}) {
  const token = AuthService.getToken();
  const headers = {'content-type': 'application/json'};

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  if (customConfig.method === undefined) {
    throw new Error('You must provide a method for your request !');
  }

  const config = {
    method: customConfig.method,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  return window
    .fetch(`${process.env.REACT_APP_URL}/${endpoint}`, config)
    .then(async response => await handleResponse(response));
}

async function handleResponse(response) {
  if (response.status === 401) {
    AuthService.logout();
    window.location.assign(window.location);
    return;
  }

  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    return Promise.reject(data);
  }
}

export {client};
