import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt/jwt.strategy";
import { JwtAuthModule } from "./jwt/jwt.module";
import { AuthConntroller } from "./auth.controller";
import { UserModule } from "src/user/user.module";
import { AuthService } from "./auth.service";

@Module({
    imports: [
        JwtAuthModule,
        UserModule
    ],
    providers: [JwtStrategy, AuthService],
    controllers: [AuthConntroller]
})

export class AuthModule {}