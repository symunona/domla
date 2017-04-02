/**
 * This file handles authentication related services.
 * It handles login/logout, and our precious user object.
 *
 * LEARN NOTE: I have A LOT which I feel like black magic to me in here.
 */

import {Injectable} from '@angular/core';
import {Observable, Subject, BehaviorSubject, Subscription} from "rxjs/Rx";
import {AngularFireAuth, FirebaseAuthState, AngularFire, AuthProviders, AuthMethods} from "angularfire2";
import {AuthInfo} from "./auth-info";
import {Router} from "@angular/router";

@Injectable()
export class AuthService {

  static UNKNOWN_USER = new AuthInfo(null);

  // LEARN NOTE: What the hack is a BehaviourSubject?
  authInfo$: BehaviorSubject<AuthInfo> = new BehaviorSubject<AuthInfo>(AuthService.UNKNOWN_USER);

  // LEARN NOTE: This is a standard object which updates as the subscription.
  public user: {};

  // LEARN NOTE: I tried to crate an observable too, but I truly do not
  // understand the difference.
  public userObservable: Observable<any>;

  constructor(private auth: AngularFireAuth, private router: Router, public af: AngularFire) {

    // LEARN NOTE: So we have AngularFireAuth, and AngularFire. And here, we
    // reference AngularFire's Auth. WHY???
    this.userObservable = this.af.auth;

    // LEARN NOTE: This is neat I figured it by myself, however I am fairly certain this
    // is the wrong way.
    this.af.auth.subscribe(user => {
      console.log('[AuthService] constructor, user subscription', user);
      if (user) {
        // user logged in
        this.user = user;
      }
      else {
        // user not logged in
        this.user = {};
      }
    });

  }


  /**
   * Logs in with the email/password pair.
   * @param email
   * @param password
   * @returns {Observable<any>}
   */
  login(email, password): Observable<FirebaseAuthState> {

    // return this.auth.login({email, password});

    return this.fromFirebaseAuthPromise(this.auth.login({email, password}));
  }

  /**
   * Authenticates google with a redirect.
   * @returns {firebase.Promise<FirebaseAuthState>}
   */
  loginGoogle() {
    return this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Redirect
    })
  }

  /**
   * Lets the user register with email & password combo.
   *
   * LEARN NOTE: I wonder if there is such a thing existing in FireBase as
   * password recovery for this kind of auth?
   *
   * @param email
   * @param password
   * @returns {Observable<any>}
   */
  signUp(email, password) {
    return this.fromFirebaseAuthPromise(this.auth.createUser({email, password}));
  }

  /*
   * This is a demo on how we can 'Observify' any asynchronous interaction.
   *
   * LEARN NOTE: Why?
   *
   */
  fromFirebaseAuthPromise(promise): Observable<any> {

    const subject = new Subject<any>();

    promise
      .then(res => {
          const authInfo = new AuthInfo(this.auth.getAuth().uid);
          this.authInfo$.next(authInfo);
          subject.next(res);
          subject.complete();
        },
        err => {
          this.authInfo$.error(err);
          subject.error(err);
          subject.complete();
        });

    return subject.asObservable();
  }

  /**
   * Logs the user out from all.
   */
  logout() {
    this.auth.logout();
    this.authInfo$.next(AuthService.UNKNOWN_USER);
    this.router.navigate(['/login']);

  }

}
