import { Injectable } from '@nestjs/common';
import { GeminiConnector, IGeminiResponse } from './connectors/GeminiConnector';
import { MOCK_DRINKS_RESPONSE } from './data';
import { DrinksResponseDto } from './dto';

const geminiConnector = new GeminiConnector();

@Injectable()
export class AppService {
  getMockDrinks(): DrinksResponseDto {
    return MOCK_DRINKS_RESPONSE;
  }

  async generateDrinks(prompt?: string): Promise<IGeminiResponse> {
    return geminiConnector.generateDrink(prompt);
  }
}
