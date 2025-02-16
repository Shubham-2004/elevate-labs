// src/app/home/home.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import Router for navigation
import { HeaderComponent } from "../../shared/components/header/header.component";
import { TechstackComponent } from "../../shared/components/techstack/techstack.component";
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { SharedModule } from '../../shared/shared.module';
import { FeatureComponentComponent } from "../../shared/components/feature-component/feature-component.component";
import { FooterComponent } from "../../shared/components/footer/footer.component";

@Component({
  selector: 'app-home',
  standalone: true, 
  imports: [HeaderComponent, TechstackComponent, SharedModule, FeatureComponentComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private auth: Auth, private router: Router) {}

  async loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(this.auth, provider); 
      console.log('User logged in successfully:', result.user);
      this.router.navigate(['dashboard']);
    } catch (error) {
      console.error('Error during Google login:', error);
    }
  }
}