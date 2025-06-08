import { IsString, IsNumber, IsOptional, IsBoolean, IsArray } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()

  stockAvailable: number;

  @IsBoolean()

  isAvailable: boolean;

  @IsString()

  category: string;

  @IsArray()
  tags: string[];
}