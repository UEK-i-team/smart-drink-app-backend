import { Body, Controller, Get, Post } from '@nestjs/common';
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

  @Post('/get-drink')
  async postGetDrink(@Body('prompt') prompt: string): Promise<IGeminiResponse> {
    return this.appService.generateDrinks(prompt);
  }
}
