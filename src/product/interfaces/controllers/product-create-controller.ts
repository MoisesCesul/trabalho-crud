import { Body, Controller, Post } from '@nestjs/common';
import { ProductPrismaRepository } from 'src/product/infrastructure/prisma/product-prisma.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateProductSchema } from '../validators/create-product.schema';
import { CreateProductService } from 'src/product/aplication/services/create-product.service';



@Controller('products')
export class CreateProductController {
  private readonly createProduct: CreateProductService;

  constructor(private readonly productRepo: ProductPrismaRepository) {
    this.createProduct = new CreateProductService(this.productRepo);
  }

@Post()
async create(@Body() body: CreateProductDto) {
  const parsedBody = CreateProductSchema.parse(body);

  const product = await this.createProduct.execute(parsedBody);
  return product;
}
  
}