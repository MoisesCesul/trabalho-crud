
import { ConflictException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { Product } from 'src/product/domain/entities/product.entity';
import { ProductRepository } from 'src/product/domain/repositories/product.repository';

@Injectable()
export class ProductPrismaRepository implements ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(product: Product): Promise<Product> {
  try {
    const created = await this.prisma.product.create({
      data: {
        id: product.id,
        name: product.name,
        price: product.price,
        description: product.description,
        stockAvailable: product.stockAvailable,
        isAvailable: product.isAvailable,
        category: product.category as any,
        tags: product.tags,
      },
    });

    return new Product(
      created.id,
      created.name,
      created.price,
      created.stockAvailable,
      created.isAvailable,
      created.category,
      created.tags,
      created.description ?? ""
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      throw new ConflictException(`Product with name "${product.name}" already exists.`);
    }
    throw error;
  }
}

  async findById(id: string) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    return product ? this.mapToDomain(product) : null;
  }

  async findAll({ skip, take }: { skip: number; take: number }) {
    const products = await this.prisma.product.findMany({
      skip,
      take,
      orderBy: { createdAt: 'desc' },
    });
    return products.map(this.mapToDomain);
  }

async update(product: Product): Promise<void> {
  await this.prisma.product.update({
    where: { id: product.id },
    data: {
      name: product.name,
      price: product.price,
      description: product.description,
      stockAvailable: product.stockAvailable,
      isAvailable: product.isAvailable,
      category: product.category as any,
      tags: product.tags,
      updatedAt: new Date(),
    },
  });
}

async delete(id: string): Promise<void> {
  await this.prisma.product.delete({
    where: { id },
  });
}

  private mapToDomain(raw: any): Product {
    return new Product(
      raw.id,
      raw.name,
      raw.price,
      raw.stockAvailable,
      raw.isAvailable,
      raw.category,
      raw.tags,
      raw.description ?? undefined,
    );
  }
}
