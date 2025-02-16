import { Component, OnInit } from '@angular/core';
import { LucideAngularModule, FileCog, Moon, Lightbulb, Menu } from 'lucide-angular';
import { Auth, User } from '@angular/fire/auth';
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngIf

import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LucideAngularModule, RouterModule , CommonModule,], // Add CommonModule here
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  readonly FileCog = FileCog;
  readonly Moon = Moon;
  readonly Menu = Menu;
  readonly Lightbulb = Lightbulb;
  isDropdownVisible = false;

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }
  user: User | null = null;

  constructor(private auth: Auth) {}

  ngOnInit() {
    
    this.auth.onAuthStateChanged((user) => {
      this.user = user; 
    });
  }
}
