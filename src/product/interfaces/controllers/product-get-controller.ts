import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { GetProductByIdUseCase } from 'src/product/aplication/use-cases/get-product-by-id.use-case';
import { GetProductsUseCase } from 'src/product/aplication/use-cases/get-products.use-case';
import { z } from 'zod';

const PaginationSchema = z.object({
  page: z.string().transform(Number).optional().default('1'),
  limit: z.string().transform(Number).optional().default('10'),
});

@Controller('products')
export class ProductGetController {
  constructor(
    private readonly getProductsUseCase: GetProductsUseCase,
    private readonly getProductByIdUseCase: GetProductByIdUseCase,
  ) {}

  @Get(':id')
  async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.getProductByIdUseCase.execute(id);
  }

  @Get()
  async getAll(@Query() query: any) {
    const { page, limit } = PaginationSchema.parse(query);
    const products = await this.getProductsUseCase.execute({ page, limit });
    return products;
  }
}