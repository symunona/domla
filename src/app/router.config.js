"use strict";
// import {LoginComponent} from "../../../angular-firebase-app/src/app/login/login.component";
// import {RegisterComponent} from "../../../angular-firebase-app/src/app/register/register.component";
// import {AuthGuard} from "../../../angular-firebase-app/src/app/shared/security/auth.guard";
var day_list_component_1 = require('./day-list/day-list.component');
var login_component_1 = require("./login/login.component");
var register_component_1 = require("./register/register.component");
// import {EditDayComponent} from "./edit-day/edit-day.component";
// import {DayResolver} from "./shared/model/day.resolver";
exports.routerConfig = [
    {
        path: 'home',
        component: day_list_component_1.DayListComponent
    },
    // {
    //     path: 'days/:date',
    //     children: [
    //         {
    //           path: 'edit',
    //           component:  EditDayComponent,
    //           resolve: {
    //             lesson: DayResolver
    //         }
    //         },
    //         {
    //             path: '',
    //             component: DayListComponent
    //         }
    //     ]
    // },
    // {
    //   path: 'lessons/:id',
    //   children: [
    //       {
    //           path: 'edit',
    //           component:  EditLessonComponent,
    //           resolve: {
    //             lesson: LessonResolver
    //           }
    //       },
    //       {
    //           path: '',
    //           component: LessonDetailComponent,
    //           canActivate: [AuthGuard]
    //       }
    //   ]
    // },
    {
        'path': 'login',
        component: login_component_1.LoginComponent
    },
    {
        path: 'register',
        component: register_component_1.RegisterComponent
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];
