import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { IGeminiResponse } from './connectors/GeminiConnector';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): IGeminiResponse {
    return this.appService.getHello();
  }

  // TODO: Dodane tylko dla testów
  @Post('/getDrink')
  async postGetDrink(@Body('prompt') prompt: string): Promise<IGeminiResponse> {
    return await this.appService.generateDrinks(prompt);
  }
}
