import {Route} from "@angular/router";

import {DayListComponent} from './day-list/day-list.component';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {AuthGuard} from "./shared/security/auth.guard";
import {EditDayComponent} from "./edit-day/edit-day.component";

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
    path: 'days',
    component: EditDayComponent,

    // LEARN NOTE: I saw this pattern on AngularUniversity.
    // Why do they use this, instead of loading the object
    // in the view-component's constructor from a service?
    // What benefits does this approach has? (other that I
    // could not make that work :D)

    // resolve: {
    //   day: DayResolver
    // }
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





