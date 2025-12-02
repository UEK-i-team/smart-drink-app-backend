import { Injectable } from '@nestjs/common';
import { GeminiConnector, IGeminiResponse } from './connectors/GeminiConnector';

const geminiConnector = new GeminiConnector();

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  // TODO: Dodane tylko dla testów
  async generateDrinks(prompt: string): Promise<IGeminiResponse> {
    return geminiConnector.generateDrink(prompt);
  }

  async generateImages(prompt: IGeminiResponse): Promise<Buffer | null> {
    return geminiConnector.generateImage(prompt);
  }
}
