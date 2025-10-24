import { DescriptionService } from './description.service';

describe('DescriptionService', () => {
  let service: DescriptionService;

  beforeEach(() => {
    service = new DescriptionService();
  });

  it('should return a response object with required and optional fields', () => {
    const description = 'This is a test description.';
    const result = service.buildResponse(description);

    expect(result).toHaveProperty('description', description);
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('timestamp');
    expect(result).toHaveProperty('metadata');
    expect(result.metadata).toHaveProperty('wordCount', 5); // 5 words
  });

  it('should generate a unique id (uuid)', () => {
    const result1 = service.buildResponse('Test one');
    const result2 = service.buildResponse('Test two');

    expect(result1.id).not.toEqual(result2.id);
  });

  it('should generate a valid ISO timestamp', () => {
    const result = service.buildResponse('Check timestamp');
    expect(() => new Date(result.timestamp)).not.toThrow();
  });

  it('should correctly count word count in metadata', () => {
    const description = 'Count how many words are here';
    const result = service.buildResponse(description);
    expect(result.metadata.wordCount).toBe(6);
  });
});
