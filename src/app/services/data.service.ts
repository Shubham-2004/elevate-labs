import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'http://localhost:4200/api/generate';

  constructor() {}

  // Send the user's prompt to the backend and get the generated text
  async generateText(prompt: string) {
    try {
      const response = await axios.post(this.apiUrl, { prompt });
      return response.data.response;
    } catch (error) {
      console.error('Error generating text:', error);
      throw error;
    }
  }
}