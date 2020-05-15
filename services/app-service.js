import {isLoggedIn, getUser} from './auth-service';

async function bootstrapAppData() {
  let appData = {user: null};

  if (await isLoggedIn()) {
    appData.user = await getUser();
  }

  return appData;
}

export {bootstrapAppData};
