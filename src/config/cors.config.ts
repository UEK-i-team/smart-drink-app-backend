import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

type CorsCallback = (err: Error | null, allow?: boolean) => void;

export const getCorsConfig = (isDevMode: boolean): CorsOptions => ({
  origin: (origin: string | undefined, callback: CorsCallback) => {
    if (!origin) {
      return callback(null, true);
    }
    if (
      isDevMode &&
      (origin.startsWith('http://localhost') || origin.startsWith('http://127.0.0.1'))
    ) {
      return callback(null, true);
    }
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
});
