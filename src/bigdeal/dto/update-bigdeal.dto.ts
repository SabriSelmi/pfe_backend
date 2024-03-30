import { PartialType } from '@nestjs/mapped-types';
import { CreateBigdealDto } from './create-bigdeal.dto';

export class UpdateBigdealDto extends PartialType(CreateBigdealDto) {}
