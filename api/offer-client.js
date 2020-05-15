import {client} from './api-client';

function addOffer(token, userId) {
  return client(`users/${userId}/add-offer`, {
    body: {token},
    method: 'POST',
  });
}

function application(formData) {
  return client('applications', {
    body: formData,
    method: 'POST',
  });
}

function myApplication(formData) {
  return client('offers', {
    method: 'GET',
  });
}

function get(id) {
  return client(`offers/${id}`, {
    method: 'GET',
  });
}

function invite(formData) {
  return client(
    `invitations/invite/${formData.offerId}?userEmail=${formData.email}`,
    {
      method: 'GET',
    },
  );
}

function createOffer(formData) {
  return client('offers', {
    body: formData,
    method: 'POST',
  });
}

function myOffers(page = 1) {
  return client(`offers/?page=${page}`, {
    method: 'GET',
  });
}

export {
  application,
  addOffer,
  myOffers,
  myApplication,
  invite,
  createOffer,
  get,
};
