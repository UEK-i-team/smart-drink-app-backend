import { Body, Controller, Post } from '@nestjs/common';
import { DescriptionDto } from '../utils/dto/description.dto';
import { DescriptionService } from './description.service';

@Controller('description')
export class DescriptionController {
  constructor(private readonly descriptionService: DescriptionService) {}

  @Post()
  handleDescription(@Body() dto: DescriptionDto) {
    return this.descriptionService.buildResponse(dto.description);
  }
}
