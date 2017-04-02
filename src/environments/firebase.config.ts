import {AuthMethods, AuthProviders} from "angularfire2";

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
