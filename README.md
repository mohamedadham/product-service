# Product service

This is a microservice for managing products. It is built using NestJS and TypeScript, and uses TypeORM for database access. This service communicates with other microservices (user, order, payment) using RabbitMQ.

## Requirements
Node.js v12 or higher
Docker

## Getting Started
1. Clone the repository:
```
git clone https://github.com/mohamedadham/Product-Service.git
```

2. Install the dependencies:
```
npm install
```

3. Copy the example environment file and update the variables:
```
cp .env.example .env
```

4. Start the User Service and its dependencies using Docker Compose:

```
docker-compose up
```

The service should now be running on http://localhost:3000.

## Environment Variables
The following environment variables need to be set:

- NODE_ENV: The environment (e.g. development, production)
- PORT: The port number the service should listen on
- DATABASE_URL: The URL of the database
- RABBITMQ_URL: The URL of the RabbitMQ server



## Contributing
If you would like to contribute to this project, please create a pull request.

## License
This project is licensed under the MIT License.
