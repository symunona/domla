// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

import {AuthMethods, AuthProviders} from "angularfire2";

export const environment = {
  production: false
};

export const firebaseConfig = {
  apiKey: "AIzaSyCt7VglJnVe0ZwbFFAwXLviYCh02zEa7s0",
  authDomain: "domlafork.firebaseapp.com",
  databaseURL: "https://domlafork.firebaseio.com",
  projectId: "domlafork",
  storageBucket: "domlafork.appspot.com",
  messagingSenderId: "805488029767"
};



export const authConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};
