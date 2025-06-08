import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from 'src/product/domain/repositories/product.repository';
import { Product } from 'src/product/domain/entities/product.entity';

@Injectable()
export class EditProductService {
  constructor(private readonly repository: ProductRepository) {}

  async execute(product: Product): Promise<void> {
    const existing = await this.repository.findById(product.id);
    if (!existing) {
      throw new NotFoundException('Product not found');
    }
    await this.repository.update(product);
  }
}
