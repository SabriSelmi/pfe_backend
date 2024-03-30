import { PartialType } from '@nestjs/mapped-types';
import { CreateNormalDto } from './create-normal.dto';

export class UpdateNormalDto extends PartialType(CreateNormalDto) {}
