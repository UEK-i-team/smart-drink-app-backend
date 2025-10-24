import { IsNotEmpty, IsString } from 'class-validator';

export class DescriptionDto {
  @IsString()
  @IsNotEmpty()
  readonly description: string;
}
