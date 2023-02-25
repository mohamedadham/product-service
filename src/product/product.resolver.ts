import { ProductPagination, ProductList } from '../types/product.pagination';
import { ProductFilter } from '../types/product.filter';
import { Product } from '../entities/product.entity';
import { ProductService } from './product.service';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { ValidationPipe } from '@nestjs/common';

@Resolver('Product')
export class ProductResolver {
  constructor(private productService: ProductService) {}

  @Query('product')
  async product(@Args('id') id: number): Promise<Product> {
    return this.productService.findOneById(id);
  }

  @Mutation('createProduct')
  async createProduct(@Args('product') product: Product): Promise<Product> {
    try {
      return await this.productService.create(product);
    } catch (err) {
      throw err;
    }
  }

  @Query('products')
  async products(
    @Args('filter', { nullable: true }, ValidationPipe) filter: ProductFilter,
    @Args('pagination', { nullable: true }) pagination: ProductPagination,
  ): Promise<ProductList> {
    const { products, totalCount } = await this.productService.findAll(
      filter,
      pagination,
    );
    return { products, totalCount };
  }

  @Query('searchProducts')
  async searchProducts(@Args('query') query: string) {
    return this.productService.searchProducts(query);
  }
}
