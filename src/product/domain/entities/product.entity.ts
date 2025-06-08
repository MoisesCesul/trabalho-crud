export class Product {
  constructor(
    public readonly id: string,
    public name: string,
    public price: number,
    public stockAvailable: number,
    public isAvailable: boolean,
    public category: string,
    public tags: string[],
    public description?: string,
  ) { 
  function mapToDomain(raw: any): Product {
    return new Product(
      raw.id,
      raw.name,
      raw.price,
      raw.stockAvailable,
      raw.isAvailable,
      raw.category,
      raw.tags,
      raw.description ?? undefined
    );
  }
  }
}