import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { Expose } from 'class-transformer';

export class AiResponseDto {
  @Expose()
  @IsNumber()
  @IsNotEmpty()
  readonly chatId: number;

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  readonly responseId: number;

  @Expose()
  @IsString()
  @IsNotEmpty()
  readonly answer: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  readonly imagePath: string;
}