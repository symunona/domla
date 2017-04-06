import {Route} from "@angular/router";

import {DayListComponent} from './day-list/day-list.component';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {AuthGuard} from "./shared/security/auth.guard";
import {EditDayComponent} from "./edit-day/edit-day.component";
import {DayResolver} from "./shared/model/day.resolver";

export const routerConfig: Route[] = [
  {
    path: 'home',
    component: DayListComponent,

    // LEARN NOTE: Is there a good way to figure out what kind
    // of functionality lies beneath this? Like looking into
    // router did not really help.
    canActivate: [AuthGuard]
  },
  {
    path: 'days/:date',
    component: EditDayComponent,

    // I saw this pattern on AngularUniversity.
    // Why do they use this, instead of loading the object
    // in the view-component's constructor from a service?
    // What benefits does this approach has? (other that I
    // could not make that work :D)
    // LEARN ANSWER: the point of this approach to have all the data necessary for the view
    // be ready by the time the view is shown so you don't poison the precious eyes of your
    // users with incomplete views
    // https://blog.thoughtram.io/angular/2016/10/10/resolving-route-data-in-angular-2.html
    // it works now :)

    resolve: {
      day: DayResolver
    }
  },

  {
    'path': 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent
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





