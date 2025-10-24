import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { IGeminiResponse } from './connectors/GeminiConnector';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/getDrink')
  async postGetDrink(@Body('prompt') prompt: string): Promise<IGeminiResponse> {
    return await this.appService.generateDrinks(prompt);
  }

  @Post('/getImage')
  async postGenerateImage(prompt: IGeminiResponse): Promise<void> {
    return await this.appService.generateImages(prompt);
  }
}
