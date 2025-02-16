// src/app/dashboard/dashboard.component.ts

import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { HeaderComponent } from "../shared/components/header/header.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [HeaderComponent]
})
export class DashboardComponent {
  user: any;

  constructor(private auth: Auth) {
    this.user = this.auth.currentUser; // Get the current user
  }
}