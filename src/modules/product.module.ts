import { Module } from '@nestjs/common';
import { ProductPrismaRepository } from 'src/product/infrastructure/prisma/product-prisma.repository';
import { ProductGetController } from 'src/product/interfaces/controllers/product-get-controller';
import { ProductRepository } from 'src/product/domain/repositories/product.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CreateProductController } from 'src/product/interfaces/controllers/product-create-controller';
import { DeleteProductUseCase } from 'src/product/aplication/services/delete-product.service';
import { ProductDeleteController } from 'src/product/interfaces/controllers/product-delete-controller';
import { EditProductController } from 'src/product/interfaces/controllers/product-edit-controller';
import { EditProductService } from 'src/product/aplication/services/edit-product.service';
import { GetProductsService } from 'src/product/aplication/services/get-products.service';
import { GetProductByIdService } from 'src/product/aplication/services/get-product-by-id.service';

@Module({
  imports: [PrismaModule],
  controllers: [ProductGetController,CreateProductController,ProductDeleteController,EditProductController],
  providers: [
    {
      provide: ProductRepository,
      useClass: ProductPrismaRepository,
    },
    GetProductByIdService,
    GetProductsService,
    ProductPrismaRepository,
    DeleteProductUseCase,
    EditProductService
  ],
  exports: [GetProductByIdService, GetProductsService,DeleteProductUseCase, EditProductService],
})
export class ProductModule {}