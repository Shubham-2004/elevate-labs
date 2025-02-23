import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { HeaderComponent } from "../shared/components/header/header.component";
import { UbButtonDirective } from "@/components/ui/button";
import { SideMenuComponent } from "../side-menu/side-menu.component";
import { FeaturesHeaderComponent } from "../features-header/features-header.component";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IdeaValidationComponent } from "../features/idea-validation/idea-validation.component";
import { MarketInsightsComponent } from "../features/market-insights/market-insights.component";
import { FinancialProjectionsComponent } from "../features/financial-projections/financial-projections.component";
import { RiskAnalysisComponent } from "../features/risk-analysis/risk-analysis.component";
import { LandingpageComponent } from "../features/landingpage/landingpage.component";
import { LogogenerateComponent } from "../features/logogenerate/logogenerate.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true, // Mark as standalone
  imports: [
    HeaderComponent,
    SideMenuComponent,
    FeaturesHeaderComponent,
    CommonModule,
    RouterModule,
    IdeaValidationComponent,
    MarketInsightsComponent,
    FinancialProjectionsComponent,
    RiskAnalysisComponent,
    LandingpageComponent,
    LogogenerateComponent
  ]
})
export class DashboardComponent {
  selectedFeature: string = ''; // Default feature

  // Method to handle feature selection
  onFeatureSelected(feature: string): void {
    this.selectedFeature = feature;
  }
  user: any;

  constructor(private auth: Auth) {
    this.user = this.auth.currentUser; // Get the current user
  }


}