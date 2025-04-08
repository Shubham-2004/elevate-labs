import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'; // Import DomSanitizer

@Component({
  selector: 'app-landingpage',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent {
  prompt: string = '';
  landingPageCode: string = ''; // Stores the raw HTML/CSS/JS code
  safeLandingPageCode: SafeHtml = ''; // Sanitized version of landingPageCode
  loading: boolean = false;
  errorMessage: string = '';

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  generateLandingPage() {
    if (!this.prompt.trim()) {
      alert('Please enter a prompt.');
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.landingPageCode = '';
    const payload = { prompt: this.prompt };

    this.http.post<any>('https://elevate-labs.onrender.com/api/generate-landing-page', payload).subscribe(
      (response) => {
        this.loading = false;
        this.landingPageCode = response.landingPageCode;

        // Sanitize the landing page code before rendering it
        this.safeLandingPageCode = this.sanitizer.bypassSecurityTrustHtml(this.landingPageCode);
      },
      (error) => {
        this.loading = false;
        console.error('Error generating landing page:', error);
        this.errorMessage = 'Failed to generate landing page. Please try again.';
      }
    );
  }
}