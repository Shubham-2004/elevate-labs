import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Required for ngModel
import { HttpClient, HttpClientModule } from '@angular/common/http'; // For HTTP requests
import {
  UbCardContentDirective,
  UbCardDescriptionDirective,
  UbCardDirective,
  UbCardFooterDirective,
  UbCardHeaderDirective,
  UbCardTitleDirective,
} from '@/components/ui/card';

@Component({
  selector: 'app-idea-validation',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, // Required for ngModel
    HttpClientModule,
    UbCardContentDirective,
    UbCardDescriptionDirective,
    UbCardDirective,
    UbCardHeaderDirective,
    UbCardTitleDirective,
  ],
  templateUrl: './idea-validation.component.html',
  styleUrls: ['./idea-validation.component.css'],
})
export class IdeaValidationComponent {
  projectDescription: string = '';
  currentStep: number = 1; 
  validationResult: string = ''; 
  previousResponses: string[] = []; 
  loading: boolean = false;
  errorMessage: string = '';
  stepsCompleted: boolean = false; 

  constructor(private http: HttpClient) {}

  validateIdea() {
    if (!this.projectDescription.trim()) {
      alert('Please enter a project description.');
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.validationResult = '';

    const payload = {
      idea: this.projectDescription,
      step: this.currentStep, 
    };

    this.http.post<any>('https://elevate-labs.onrender.com/api/validate-idea', payload).subscribe(
      (response) => {
        this.loading = false;

        this.validationResult = response.response;
        this.previousResponses.push(this.validationResult);

        if (this.currentStep < 5) {
          this.currentStep++;
        } else {
          this.stepsCompleted = true; 
        }
      },
      (error) => {
        this.loading = false;
        console.error('Error validating idea:', error);
        this.errorMessage = 'Failed to validate the idea. Please try again.';
      }
    );
  }

  resetValidation() {
    // Reset the form and validation process
    this.projectDescription = '';
    this.currentStep = 1;
    this.validationResult = '';
    this.errorMessage = '';
    this.previousResponses = [];
    this.stepsCompleted = false;
  }
}