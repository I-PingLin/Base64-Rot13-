
import { Injectable } from '@angular/core';
import { GoogleGenAI, GenerateContentResponse } from '@google/genai';

@Injectable({
  providedIn: 'root',
})
export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    // IMPORTANT: This relies on the `process.env.API_KEY` being available in the execution environment.
    // Do not hardcode the API key here.
    if (!process.env.API_KEY) {
      throw new Error("API_KEY environment variable not set. Please configure it before running the application.");
    }
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async generateContent(prompt: string): Promise<string> {
    try {
      const response: GenerateContentResponse = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });
      
      return response.text;

    } catch (error) {
      console.error('Error calling Gemini API:', error);
      // Re-throw a more user-friendly error
      if (error instanceof Error) {
          throw new Error(`Gemini API Error: ${error.message}`);
      }
      throw new Error('An unexpected error occurred while communicating with the Gemini API.');
    }
  }
}
