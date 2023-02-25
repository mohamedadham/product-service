import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

@Module({
  imports: [ElasticsearchModule.register({ node: 'http://localhost:9200' })],
  providers: [ProductService, ProductResolver],
})
export class ProductModule {}
