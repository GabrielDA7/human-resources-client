import {isLoggedIn, getUser} from './auth-service';

async function bootstrapAppData() {
  let appData = {user: null};

  if (isLoggedIn) {
    appData.user = await Promise.all([getUser()]);
  }

  return appData;
}

export {bootstrapAppData};
