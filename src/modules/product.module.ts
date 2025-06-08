import { Module } from '@nestjs/common';
import { ProductPrismaRepository } from 'src/product/infrastructure/prisma/product-prisma.repository';
import { GetProductByIdUseCase } from 'src/product/aplication/use-cases/get-product-by-id.use-case';
import { GetProductsUseCase } from 'src/product/aplication/use-cases/get-products.use-case';
import { ProductGetController } from 'src/product/interfaces/controllers/product-get-controller';
import { ProductRepository } from 'src/product/domain/repositories/product.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CreateProductController } from 'src/product/interfaces/controllers/product-create-controller';
import { DeleteProductUseCase } from 'src/product/aplication/use-cases/delete-product.use-case';
import { ProductDeleteController } from 'src/product/interfaces/controllers/product-delete-controller';
import { EditProductController } from 'src/product/interfaces/controllers/product-edit-controller';
import { EditProductUseCase } from 'src/product/aplication/use-cases/edit-product.use-case';

@Module({
  imports: [PrismaModule],
  controllers: [ProductGetController,CreateProductController,ProductDeleteController,EditProductController],
  providers: [
    {
      provide: ProductRepository,
      useClass: ProductPrismaRepository,
    },
    GetProductByIdUseCase,
    GetProductsUseCase,
    ProductPrismaRepository,
    DeleteProductUseCase,
    EditProductUseCase
  ],
  exports: [GetProductByIdUseCase, GetProductsUseCase,DeleteProductUseCase, EditProductUseCase],
})
export class ProductModule {}