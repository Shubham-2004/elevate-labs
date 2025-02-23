import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-financial-projections',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './financial-projections.component.html',
  styleUrls: ['./financial-projections.component.css']
})
export class FinancialProjectionsComponent {
  startupIdea: string = '';
  loading: boolean = false;
  errorMessage: string = '';
  projections: string = '';
  formattedProjections: SafeHtml = '';

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  generateProjections() {
    if (!this.startupIdea.trim()) {
      alert('Please enter a startup idea.');
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.projections = '';
    this.formattedProjections = '';

    const payload = { idea: this.startupIdea };

    this.http.post('http://localhost:5000/api/financial-projections', payload, { responseType: 'text' }).subscribe(
      (response) => {
        this.loading = false;
        this.projections = response;

        // Format the projections with bold and italic styles and add spacing
        this.formattedProjections = this.sanitizer.bypassSecurityTrustHtml(
          this.projections
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold text
            .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic text
            .replace(/\n/g, '<br>') // Add line breaks for spacing
        );
      },
      (error) => {
        this.loading = false;
        console.error('Error generating financial projections:', error);
        this.errorMessage = 'Failed to generate financial projections. Please try again.';
      }
    );
  }
}