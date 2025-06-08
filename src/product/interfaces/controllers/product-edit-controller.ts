import { Body, Controller, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";

import { EditProductService } from "src/product/aplication/services/edit-product.service";
import { Product } from "src/product/domain/entities/product.entity";
import { UpdateProductDto } from "./dto/update-product.dto";




@Controller('products')
export class EditProductController {
  constructor(private readonly updateProductUseCase: EditProductService) {}

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