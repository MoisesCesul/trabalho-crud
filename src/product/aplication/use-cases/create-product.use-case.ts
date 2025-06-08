import { Injectable } from '@nestjs/common';
import { Product } from '../../domain/entities/product.entity';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { CreateProductInput } from '../../interfaces/validators/create-product.schema';
import { v4 as uuid } from 'uuid';
@Injectable()
export class CreateProductUseCase {
  constructor(private readonly productRepo: ProductRepository) { }

  async execute(data: CreateProductInput): Promise<Product> {
    const product = new Product(
      uuid(),
      data.name,
      data.price,
      data.stockAvailable,
      data.isAvailable ?? true,
      data.category,
      data.tags,
      data.description 
    );

    return this.productRepo.create(product);
  }
}