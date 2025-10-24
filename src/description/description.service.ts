import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class DescriptionService {
  buildResponse(description: string) {
    return {
      description,
      id: uuidv4(),
      timestamp: new Date().toISOString(),
      metadata: {
        wordCount: description.trim().split(/\s+/).length,
      },
    };
  }
}
