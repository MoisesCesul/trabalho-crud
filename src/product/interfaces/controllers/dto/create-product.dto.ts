import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsArray,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  stockAvailable: number;

  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;

  @IsString()
  category: string;

  @IsArray()
  @IsString({ each: true })
  tags: string[];
}