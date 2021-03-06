// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

import {AuthMethods, AuthProviders} from "angularfire2";

export const environment = {
  production: false
};

export const firebaseConfig = {
  apiKey: "AIzaSyBVw0DXIooFx2m8oivH4aY0lA5i6HGuSKQ",
  authDomain: "days-of-my-life-df8c0.firebaseapp.com",
  databaseURL: "https://days-of-my-life-df8c0.firebaseio.com",
  storageBucket: "days-of-my-life-df8c0.appspot.com",
  messagingSenderId: "1035429128147"
};



export const authConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};
