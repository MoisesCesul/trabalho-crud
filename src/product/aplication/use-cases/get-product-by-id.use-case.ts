import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ProductRepository } from 'src/product/domain/repositories/product.repository';

@Injectable()
export class GetProductByIdUseCase {
  constructor(
    @Inject(ProductRepository) 
    private readonly repository: ProductRepository,
  ) {}

  async execute(id: string): Promise<ProductResponseDto> {
    const product = await this.repository.findById(id);
    if (!product) throw new NotFoundException('Product not found');

    return {
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description ?? null,
      stockAvailable: product.stockAvailable,
      isAvailable: product.isAvailable,
      category: product.category,
      tags: product.tags,
    };
  }
}