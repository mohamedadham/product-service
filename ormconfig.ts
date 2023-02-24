export const config = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'example',
  database: 'product_service',
  entities: ['src/entities/*.entity{.ts,.js}'],
  synchronize: true,
};
