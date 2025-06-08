import { Injectable, Inject } from '@nestjs/common';
import { ProductRepository } from 'src/product/domain/repositories/product.repository';

@Injectable()
export class GetProductsUseCase {
  constructor(
    @Inject(ProductRepository)
    private readonly repository: ProductRepository,
  ) {}

  async execute({ page, limit }: { page: number; limit: number }) {
    const skip = (page - 1) * limit;
    return this.repository.findAll({ skip, take: limit });
  }
}