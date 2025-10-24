// user-query.dto.ts
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class UserQueryDto {
  @IsNumber()
  @IsNotEmpty()
  readonly chatId: number;

  @IsNumber()
  @IsNotEmpty()
  readonly queryId: number;

  @IsString()
  @IsNotEmpty()
  readonly description: string;
}
