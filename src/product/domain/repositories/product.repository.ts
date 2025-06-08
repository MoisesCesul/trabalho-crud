import { Product } from '../entities/product.entity';

export abstract class ProductRepository {
  abstract create(product: Product): Promise<Product>;
  abstract findById(id: string): Promise<Product | null>;
  abstract findAll(options: { skip: number; take: number }): Promise<Product[]>;;
  abstract update(product: Product): Promise<void>;
  abstract delete(id: string): Promise<void>;
}