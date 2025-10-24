import { GoogleGenAI, Type } from '@google/genai';
import 'dotenv/config';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';

export enum FlavorProfiles {
  SWEET = 'Sweet',
  SEMI_SWEET = 'Semi_sweet',
  DRY = 'Dry',
}

export enum Strengths {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
}

interface IDrink {
  name: string;
  description: string;
  flavor_profile: FlavorProfiles;
  strength: Strengths;
  ingredients: string[];
  instructions: string[];
  image_description: string;
}

export interface IGeminiResponse {
  drinks: IDrink[];
  annotations: string;
}

export class GeminiConnector {
  readonly geminiApiKey: string;
  readonly model: string;

  readonly systemInstruction = `
      Twoje zadanie: zaproponuj **trzy** drinki na bazie danych wejściowych od użytkownika, które jest w stanie wykonać ze składników, które posiada.
      Pierwszy zwrócony drink powinien składać się WYŁĄCZNIE ze składników, które użytkownik posiada, 2 kolejne powinny w znaczniej większości składać się ze składników, które posiada użytkownik.

      Zwróć różnorodne propozycje drinków, kompozycje nie mogą się powtarzać.`;
  readonly responseMimeType = 'application/json';
  readonly structuredOutput = {
    type: Type.OBJECT,
    properties: {
      annotations: {
        type: Type.STRING,
        description: 'Twoja krótka odpowiedź',
      },
      drinks: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            name: {
              type: Type.STRING,
              description: 'Nazwa drinka',
            },
            description: {
              type: Type.STRING,
              description: 'Krótki opis drinka',
            },
            flavor_profile: {
              type: Type.STRING,
              description: 'Profil smaku drinka',
              enum: ['Sweet', 'Semi_sweet', 'Dry'],
            },
            strength: {
              type: Type.STRING,
              description: 'Moc drinka',
              enum: ['Low', 'Medium', 'High'],
            },
            ingredients: {
              type: Type.ARRAY,
              description: 'Listowo wypunktowane składniki z ilościami',
              items: {
                type: Type.STRING,
              },
            },
            instructions: {
              type: Type.ARRAY,
              description: 'Listowo numerowane kroki przygotowania drinka',
              items: {
                type: Type.STRING,
              },
            },
            image_description: {
              type: Type.STRING,
              description:
                'Barwny opis sceny do generowania grafiki (szkło, kolor napoju, dekoracja, tło, oświetlenie, itp.), do 40 słów.',
            },
          },
          required: [
            'name',
            'description',
            'flavor_profile',
            'strength',
            'ingredients',
            'instructions',
            'image_description',
          ],
        },
        maxItems: 3,
        minItems: 3,
      },
    },
  };

  private readonly _aiClient: GoogleGenAI;

  constructor({
    geminiApiKey = GEMINI_API_KEY,
    model = 'gemini-2.5-flash',
  }: {
    geminiApiKey?: string;
    model?: string;
  } = {}) {
    this.geminiApiKey = geminiApiKey;
    this.model = model;

    if (!this.geminiApiKey) {
      console.warn(
        '⚠️ Brak klucza GEMINI_API_KEY! Upewnij się, że zmienna środowiskowa jest ustawiona lub klucz jest przekazany do konstruktora.',
      );
    }

    this._aiClient = new GoogleGenAI({ apiKey: this.geminiApiKey });
  }

  public async generateDrink(
    prompt: string = 'Podaj mi fajne drinki na lato!',
  ): Promise<IGeminiResponse> {
    try {
      const result = await this._aiClient.models.generateContent({
        model: this.model,
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        config: {
          systemInstruction: this.systemInstruction,
          responseMimeType: this.responseMimeType,
          responseSchema: this.structuredOutput,
        },
      });

      const geminiResponse = result.text;

      if (!geminiResponse) throw new Error('Błąd podczas generowania treści');

      const geminiResponseJSON: IGeminiResponse = JSON.parse(geminiResponse) as IGeminiResponse;

      return geminiResponseJSON;
    } catch (error) {
      console.error('❌ Błąd podczas generowania treści z Gemini:', error);
      throw new Error(
        `Nie udało się wygenerować treści z API Gemini: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }
}
