interface ProductResponseDto {
  id: string;
  name: string;
  price: number;
  description: string | null;
  stockAvailable: number;
  isAvailable: boolean;
  category: string; 
  tags: string[];
}

