// src/main.ts

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { appConfig } from './app/app.config';
import { firebaseConfig } from './app/environment/firebase.config';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

bootstrapApplication(AppComponent, {
  providers: [
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    appConfig.providers, provideCharts(withDefaultRegisterables())	

  ]
}).catch(err => console.error('Error bootstrapping application:', err));