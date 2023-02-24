import { Product } from 'src/entities/product.entity';

export class ProductList {
  totalCount: number;
  products: Product[];
}

export class ProductPagination {
  limit: number;
  offset: number;
}
