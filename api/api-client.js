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
    .fetch(`http://localhost:3000/${endpoint}`, config)
    .then(async response => await handleResponse(response));
}

async function handleResponse(response) {
  if (response.status === 401) {
    await AuthService.logout();
  }

  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    return Promise.reject(data);
  }
}

export {client};
