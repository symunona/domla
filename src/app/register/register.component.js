"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var forms_1 = require("@angular/forms");
var RegisterComponent = (function () {
    function RegisterComponent(fb, authService, router) {
        this.fb = fb;
        this.authService = authService;
        this.router = router;
        this.form = this.fb.group({
            email: ['', forms_1.Validators.required],
            password: ['', forms_1.Validators.required],
            confirm: ['', forms_1.Validators.required]
        });
    }
    RegisterComponent.prototype.isPasswordMatch = function () {
        var val = this.form.value;
        return val && val.password && val.password == val.confirm;
    };
    RegisterComponent.prototype.signUp = function () {
        var _this = this;
        var val = this.form.value;
        this.authService.signUp(val.email, val.password)
            .subscribe(function () {
            alert('User created successfully !');
            _this.router.navigateByUrl('/home');
        }, function (err) { return alert(err); });
    };
    RegisterComponent = __decorate([
        core_1.Component({
            selector: 'app-register',
            templateUrl: './register.component.html',
            styleUrls: ['./register.component.css']
        })
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
