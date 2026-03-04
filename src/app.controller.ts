import { Controller, Post, Body, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { IGeminiResponse } from './connectors/GeminiConnector';
import { DrinksResponseDto } from './dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/get-mock-drinks')
  getMockDrinks(): DrinksResponseDto {
    return this.appService.getMockDrinks();
  }

  // TODO: Dodane tylko dla testów
  @Post('/get-drink')
  async postGetDrink(@Body('prompt') prompt: string): Promise<IGeminiResponse> {
    return await this.appService.generateDrinks(prompt);
  }

  // History Logic
  @Get('/getHistory')
  async getHistory(): Promise<any> {
    return this.appService.getHistory();
  }

  @Post('/addHistory')
  async addHistory(@Body('drink') drink: any): Promise<any> {
    return this.appService.addHistory(drink);
  }
}
