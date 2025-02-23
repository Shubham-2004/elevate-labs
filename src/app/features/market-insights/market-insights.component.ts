import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-market-insights',
  standalone: true,
  imports: [CommonModule, FormsModule, BaseChartDirective],
  templateUrl: './market-insights.component.html',
  styleUrls: ['./market-insights.component.css']
})
export class MarketInsightsComponent {
  startupIdea: string = '';
  loading: boolean = false;
  errorMessage: string = '';
  insights: any = null;

  // Scaling Strategies Chart Data
  scalingStrategiesChartData = {
    labels: [] as string[],
    datasets: [
      {
        data: [] as number[],
        backgroundColor: ['#4CAF50', '#FF9800', '#03A9F4'],
        label: 'Priority (%)'
      }
    ]
  };
  scalingStrategiesChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100
      }
    }
  };

  // External Features Chart Data
  externalFeaturesChartData = {
    labels: [] as string[],
    datasets: [
      {
        data: [] as number[],
        backgroundColor: ['#E91E63', '#9C27B0', '#673AB7'],
        label: 'Importance (%)'
      }
    ]
  };
  externalFeaturesChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100
      }
    }
  };

  constructor(private http: HttpClient) {}

  generateInsights() {
    if (!this.startupIdea.trim()) {
      alert('Please enter a startup idea.');
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.insights = null;

    const payload = { idea: this.startupIdea };

    this.http.post<any>('http://localhost:5000/api/market-insights', payload).subscribe(
      (response) => {
        this.loading = false;
        this.insights = response;

        // Update Scaling Strategies Chart
        if (this.insights.scalingStrategies && Array.isArray(this.insights.scalingStrategies)) {
          this.scalingStrategiesChartData.labels = this.insights.scalingStrategies.map((s: any) => s.strategy || 'Unknown');
          this.scalingStrategiesChartData.datasets[0].data = this.insights.scalingStrategies.map((s: any) => s.priority || 0);
        } else {
          this.scalingStrategiesChartData.labels = [];
          this.scalingStrategiesChartData.datasets[0].data = [];
        }

        // Update External Features Chart
        if (this.insights.externalFeatures && Array.isArray(this.insights.externalFeatures)) {
          this.externalFeaturesChartData.labels = this.insights.externalFeatures.map((f: any) => f.feature || 'Unknown');
          this.externalFeaturesChartData.datasets[0].data = this.insights.externalFeatures.map((f: any) => f.importance || 0);
        } else {
          this.externalFeaturesChartData.labels = [];
          this.externalFeaturesChartData.datasets[0].data = [];
        }
      },
      (error) => {
        this.loading = false;
        console.error('Error generating market insights:', error);
        this.errorMessage = 'Failed to generate market insights. Please try again.';
      }
    );
  }
}