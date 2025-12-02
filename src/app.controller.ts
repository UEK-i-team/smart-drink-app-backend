import { Controller, Get, Post, Body, StreamableFile, Header, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { IGeminiResponse } from './connectors/GeminiConnector';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): IGeminiResponse {
    return this.appService.getHello();
  }

  @Post('/getDrink')
  async postGetDrink(@Body('prompt') prompt: string): Promise<IGeminiResponse> {
    return await this.appService.generateDrinks(prompt);
  }

  @Post('/getImage')
  @Header('Content-Type', 'image/png')
  async postGenerateImage(@Body() prompt: IGeminiResponse): Promise<StreamableFile> {
    try {
      const buffer = await this.appService.generateImages(prompt);
      if (!buffer) {
        throw new HttpException('Failed to generate image', HttpStatus.INTERNAL_SERVER_ERROR);
      }
      return new StreamableFile(buffer);
    } catch (error) {
      throw new HttpException(
        `Image generation error: ${error instanceof Error ? error.message : String(error)}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
