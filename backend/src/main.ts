import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
    allowedHeaders: 'Content-Type,Authorization',
  })

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Task Manager')
    .setDescription('Manage your tasks')
    .setVersion('1.0')
    .addTag('taskmanager')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
