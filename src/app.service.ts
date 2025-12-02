import { Injectable } from '@nestjs/common';
import { GeminiConnector, IGeminiResponse, FlavorProfiles, Strengths } from './connectors/GeminiConnector';

const geminiConnector = new GeminiConnector();

@Injectable()
export class AppService {
  getHello(): IGeminiResponse {
    return {
      annotations: 'Here are some refreshing drink suggestions!',
      drinks: [
        {
          name: 'Mojito',
          description: 'A refreshing Cuban cocktail with mint and lime',
          flavor_profile: FlavorProfiles.SWEET,
          strength: Strengths.MEDIUM,
          ingredients: ['50ml white rum', '30ml lime juice', '10ml simple syrup', '6-8 mint leaves', 'soda water'],
          instructions: ['Muddle mint leaves with lime juice and syrup', 'Add rum and ice', 'Top with soda water', 'Garnish with mint sprig'],
          image_description: 'A tall glass filled with ice, fresh mint leaves, and bubbling clear liquid with a lime wedge on the rim, bright natural lighting'
        },
        {
          name: 'Old Fashioned',
          description: 'A classic whiskey cocktail with bitters and sugar',
          flavor_profile: FlavorProfiles.DRY,
          strength: Strengths.HIGH,
          ingredients: ['60ml bourbon', '1 sugar cube', '2 dashes Angostura bitters', 'orange peel'],
          instructions: ['Muddle sugar cube with bitters', 'Add bourbon and ice', 'Stir well', 'Garnish with orange peel'],
          image_description: 'A lowball glass with amber liquid over a large ice cube, orange peel twist, warm bar lighting'
        },
        {
          name: 'Aperol Spritz',
          description: 'An Italian aperitif cocktail, light and bubbly',
          flavor_profile: FlavorProfiles.SEMI_SWEET,
          strength: Strengths.LOW,
          ingredients: ['60ml Aperol', '90ml Prosecco', '30ml soda water', 'orange slice'],
          instructions: ['Fill glass with ice', 'Add Aperol', 'Pour Prosecco', 'Top with soda', 'Garnish with orange slice'],
          image_description: 'A wine glass with bright orange cocktail, ice cubes, and an orange slice, summer terrace background'
        }
      ]
    };
  }

  // TODO: Dodane tylko dla testów
  async generateDrinks(prompt: string): Promise<IGeminiResponse> {
    return geminiConnector.generateDrink(prompt);
  }

  async generateImages(prompt: IGeminiResponse): Promise<Buffer | null> {
    return geminiConnector.generateImage(prompt);
  }
}
