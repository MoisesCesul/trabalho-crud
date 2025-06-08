import { Body, Controller, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { ProductPrismaRepository } from "src/product/infrastructure/prisma/product-prisma.repository";
import { CreateProductUseCase } from "src/product/aplication/use-cases/create-product.use-case";
import { CreateProductSchema } from "../validators/create-product.schema";
import { EditProductUseCase } from "src/product/aplication/use-cases/edit-product.use-case";
import { Product } from "src/product/domain/entities/product.entity";
import { UpdateProductDto } from "./dto/update-product.dto";




@Controller('products')
export class EditProductController {
  constructor(private readonly updateProductUseCase: EditProductUseCase) {}

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Body() dto: UpdateProductDto,
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {

    const product = new Product(
      id,
      dto.name,
      dto.price,
      dto.stockAvailable,
      dto.isAvailable,
      dto.category,
      dto.tags,
      dto.description,
    );

    await this.updateProductUseCase.execute(product);
  }
}