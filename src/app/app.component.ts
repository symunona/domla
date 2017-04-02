import { Component } from '@angular/core';
import {AuthService} from "./shared/security/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  user = {};

  constructor(
    public as: AuthService
  ) {
    this.user = this.as.user;
  }
}
