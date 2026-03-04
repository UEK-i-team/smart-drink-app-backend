import { FlavorProfiles, Strengths } from '../connectors/GeminiConnector';
import { Expose } from 'class-transformer';

export class DrinkDto {
  @Expose()
  name!: string;

  @Expose()
  description!: string;

  @Expose()
  flavor_profile!: FlavorProfiles;

  @Expose()
  strength!: Strengths;

  @Expose()
  ingredients!: string[];

  @Expose()
  instructions!: string[];

  @Expose()
  image_description!: string;

  @Expose()
  image_url?: string;
}

export class DrinksResponseDto {
  @Expose()
  annotations!: string;

  @Expose()
  drinks!: DrinkDto[];
}
