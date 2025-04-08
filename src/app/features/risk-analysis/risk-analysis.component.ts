import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-risk-analysis',
  imports: [FormsModule, CommonModule],
  templateUrl: './risk-analysis.component.html',
  styleUrls: ['./risk-analysis.component.css'],
})
export class RiskAnalysisComponent {
  prompt: string = '';
  riskAnalysis: SafeHtml = ''; // Use SafeHtml for rendering HTML content
  isLoading: boolean = false;
  error: string | null = null;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  generateRiskAnalysis() {
    if (!this.prompt.trim()) {
      this.error = 'Please enter a description for risk analysis.';
      return;
    }

    this.isLoading = true;
    this.error = null;
    this.riskAnalysis = '';

    this.http
      .post<{ riskAnalysis: string }>('https://elevate-labs.onrender.com/api/risk-analysis', { prompt: this.prompt })
      .subscribe(
        (response) => {
          // Sanitize the HTML content before rendering
          this.riskAnalysis = this.sanitizer.bypassSecurityTrustHtml(response.riskAnalysis);
          this.isLoading = false;
        },
        (err) => {
          this.error = err.error?.error || 'An unexpected error occurred.';
          this.isLoading = false;
        }
      );
  }
}