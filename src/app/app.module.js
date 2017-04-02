"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var platform_browser_1 = require('@angular/platform-browser');
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var app_component_1 = require('./app.component');
var router_config_1 = require("./router.config");
var day_list_component_1 = require('./day-list/day-list.component');
var edit_day_component_1 = require('./edit-day/edit-day.component');
var angularfire2_1 = require("angularfire2");
var router_1 = require("@angular/router");
var firebase_config_1 = require("../environments/firebase.config");
var auth_service_1 = require("./shared/security/auth.service");
var login_component_1 = require("./login/login.component");
var register_component_1 = require("./register/register.component");
var AppModule = (function () {
    function AppModule(af) {
        var _this = this;
        this.af = af;
        this.user = {};
        this.af.auth.subscribe(function (user) {
            console.log(user);
            if (user) {
                // user logged in
                _this.user = user;
            }
            else {
                // user not logged in
                _this.user = {};
            }
        });
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                login_component_1.LoginComponent,
                register_component_1.RegisterComponent,
                day_list_component_1.DayListComponent,
                edit_day_component_1.EditDayComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                angularfire2_1.AngularFireModule.initializeApp(firebase_config_1.firebaseConfig, firebase_config_1.authConfig),
                router_1.RouterModule.forRoot(router_config_1.routerConfig),
                forms_1.ReactiveFormsModule
            ],
            providers: [auth_service_1.AuthService],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
