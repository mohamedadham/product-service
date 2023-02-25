import { ProductFilter } from '../types/product.filter';
import { ProductList, ProductPagination } from '../types/product.pagination';
import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Repository, EntityManager, Like } from 'typeorm';
import { Product } from '../entities/product.entity';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class ProductService {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
    private readonly elasticSearchService: ElasticsearchService,
  ) {}

  private get productRepository(): Repository<Product> {
    return this.entityManager.getRepository(Product);
  }

  async findAll(
    filter: ProductFilter,
    pagination: ProductPagination,
  ): Promise<ProductList> {
    const where: any = {};

    if (filter) {
      if (filter.name) {
        where.name = Like(`%${filter.name}%`);
      }

      if (filter.description) {
        where.description = Like(`%${filter.description}%`);
      }

      if (filter.price) {
        where.price = filter.price;
      }
    }

    const [products, totalCount] = await this.productRepository.findAndCount({
      where,
      take: pagination?.limit,
      skip: pagination?.offset,
    });

    return { products, totalCount };
  }

  async findOneById(id: number): Promise<Product> {
    return await this.productRepository.findOneBy({ id });
  }

  async indexProduct(product: Product): Promise<void> {
    try {
      await this.elasticSearchService.index({
        index: 'products',
        body: {
          id: product.id,
          name: product.name,
          price: product.price,
          description: product.description,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }

  async create(product: Product): Promise<Product> {
    const newProduct = await this.productRepository.save(product);
    this.indexProduct(newProduct);
    return newProduct;
  }

  async update(id: number, product: Product): Promise<Product> {
    await this.productRepository.update(id, product);
    return this.productRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }

  async searchProducts(query: string) {
    const result = await this.elasticSearchService.search({
      index: 'products',
      body: {
        query: {
          multi_match: {
            query,
            fields: ['name', 'description'],
            fuzziness: 'AUTO',
          },
        },
      },
    });
    const hits = result.hits.hits;
    return hits.map((hit) => hit._source);
  }
}
