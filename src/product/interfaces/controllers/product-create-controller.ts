import { Body, Controller, Post } from '@nestjs/common';
import { CreateProductUseCase } from 'src/product/aplication/use-cases/create-product.use-case';
import { ProductPrismaRepository } from 'src/product/infrastructure/prisma/product-prisma.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateProductSchema } from '../validators/create-product.schema';



@Controller('products')
export class CreateProductController {
  private readonly createProduct: CreateProductUseCase;

  constructor(private readonly productRepo: ProductPrismaRepository) {
    this.createProduct = new CreateProductUseCase(this.productRepo);
  }

@Post()
async create(@Body() body: CreateProductDto) {
  const parsedBody = CreateProductSchema.parse(body);

  const product = await this.createProduct.execute(parsedBody);
  return product;
}
  
}