"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var Rx_1 = require("rxjs/Rx");
var auth_info_1 = require("./auth-info");
var AuthService = (function () {
    function AuthService(auth, router) {
        this.auth = auth;
        this.router = router;
        this.authInfo$ = new Rx_1.BehaviorSubject(AuthService.UNKNOWN_USER);
    }
    AuthService.prototype.login = function (email, password) {
        this.auth.login({ email: email, password: password });
        // return this.auth.subscribe();
        return this.fromFirebaseAuthPromise(this.auth.login({ email: email, password: password }));
    };
    AuthService.prototype.signUp = function (email, password) {
        return this.fromFirebaseAuthPromise(this.auth.createUser({ email: email, password: password }));
    };
    /*
     *
     * This is a demo on how we can 'Observify' any asynchronous interaction
     *
     *
     * */
    AuthService.prototype.fromFirebaseAuthPromise = function (promise) {
        var _this = this;
        var subject = new Rx_1.Subject();
        promise
            .then(function (res) {
            var authInfo = new auth_info_1.AuthInfo(_this.auth.getAuth().uid);
            _this.authInfo$.next(authInfo);
            subject.next(res);
            subject.complete();
        }, function (err) {
            _this.authInfo$.error(err);
            subject.error(err);
            subject.complete();
        });
        return subject.asObservable();
    };
    AuthService.prototype.logout = function () {
        this.auth.logout();
        this.authInfo$.next(AuthService.UNKNOWN_USER);
        this.router.navigate(['/home']);
    };
    AuthService.UNKNOWN_USER = new auth_info_1.AuthInfo(null);
    AuthService = __decorate([
        core_1.Injectable()
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
