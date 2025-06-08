import { Injectable, NotFoundException } from "@nestjs/common";
import { ProductRepository } from "src/product/domain/repositories/product.repository";

@Injectable()
export class DeleteProductUseCase {
  constructor(private readonly repository: ProductRepository) {}

  async execute(id: string): Promise<void> {
    const product = await this.repository.findById(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    await this.repository.delete(id);
  }
}