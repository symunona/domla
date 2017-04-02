import { Component, OnInit } from '@angular/core';
import {AuthService} from "../shared/security/auth.service";

@Component({
  selector: 'side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  constructor(private authService:AuthService) { }

  ngOnInit() { }

  logout() {
    this.authService.logout();
  }
}
