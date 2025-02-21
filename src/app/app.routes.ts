import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IdeaValidationComponent } from './features/idea-validation/idea-validation.component';
import { MarketInsightsComponent } from './features/market-insights/market-insights.component';
import { FinancialProjectionsComponent } from './features/financial-projections/financial-projections.component';
import { RiskAnalysisComponent } from './features/risk-analysis/risk-analysis.component';
import { LandingpageComponent } from './features/landingpage/landingpage.component';
import { LogogenerateComponent } from './features/logogenerate/logogenerate.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'about',
        component : AboutComponent
    },
    {
        path: 'dashboard',
        component : DashboardComponent
    },
    { path: 'idea-validation', component: IdeaValidationComponent },
  { path: 'market-insights', component: MarketInsightsComponent },
  { path: 'financial-projections', component: FinancialProjectionsComponent },
  { path: 'risk-analysis', component: RiskAnalysisComponent },
  { path: 'generate-landing-page', component: LandingpageComponent },
  { path: 'generate-logo', component: LogogenerateComponent },

];
