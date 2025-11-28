import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from 'prisma/prisma.service';
import { UserService } from './user/user.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    UserModule,
    AuthModule
  ],
  providers: [
    PrismaService, UserService
  ]
})
export class AppModule {}
