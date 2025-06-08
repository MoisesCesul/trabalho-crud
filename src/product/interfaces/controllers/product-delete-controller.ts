import { Controller, Delete, HttpCode, HttpStatus, Param, ParseUUIDPipe } from "@nestjs/common";
import { DeleteProductUseCase } from "src/product/aplication/services/delete-product.service";

@Controller('products')
export class ProductDeleteController {
  constructor(
    private readonly deleteProductsUseCase: DeleteProductUseCase,
  ) {}

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    await this.deleteProductsUseCase.execute(id);
  }
}