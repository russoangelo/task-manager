import { Module } from "@nestjs/common";
import { JwtAuthService } from "./jwt.service";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "src/user/user.module";

@Module({
    imports: [
        UserModule,
        JwtModule.register({
            global: true,
            secret: `${process.env.JWT_SECRET}`,
            signOptions: { expiresIn: '5m' },
        }),
    ],
    providers: [JwtAuthService],
    exports: [JwtAuthService]
})

export class JwtAuthModule { }