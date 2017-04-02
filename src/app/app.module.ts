import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routerConfig} from "./router.config";
import { DayListComponent } from './day-list/day-list.component';
import { EditDayComponent } from './edit-day/edit-day.component';
import {AngularFireModule, AngularFire} from "angularfire2";
import {RouterModule} from "@angular/router";
import {firebaseConfig, authConfig} from "../environments/firebase.config";
import {AuthService} from "./shared/security/auth.service";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {AuthGuard} from "./shared/security/auth.guard";
import { DayViewComponent } from './day-view/day-view.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import {DayResolver} from "./shared/model/day.resolver";
import {DayService} from "./shared/model/day.service";
import { BlurChangeDirective } from './directives/blur-change.directive';
import {TagInputModule} from "ng2-tag-input/dist/modules/ng2-tag-input.module";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DayListComponent,
    EditDayComponent,
    DayViewComponent,
    SideBarComponent,
    BlurChangeDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig, authConfig),
    RouterModule.forRoot(routerConfig),
    ReactiveFormsModule

    // LEARN NOTE: This does not work, it does not find the resources.
    // I am suspecting I have to configure systemJS somewhere
    // as stated in the repo (https://www.npmjs.com/package/ng2-tag-input#configuration-for-systemjs-users)
    // but I have no clue
    // #1 Why do I have to do this
    // #2 Where should I inject that data object, I tried typings.d.ts, did not work
    // #3 Is inporting an external module such a suffering? I have seen a podcast from
    // half year ago, and it did seem like I have to insert
    // stuff to random places sometimes. Is this still this chaotic?

    // ,TagInputModule

  ],
  providers: [DayService, DayResolver, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {



}
