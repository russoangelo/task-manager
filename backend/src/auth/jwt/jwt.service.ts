import { BadRequestException, Injectable } from "@nestjs/common";
import { UUID } from "crypto";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { UserService } from "src/user/user.service";
import { RefreshTokenDto } from "../dto/auth.request";

@Injectable()
export class JwtAuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly userService: UserService
    ) {}

    async generateTokens(id: UUID, email: string) {
        const payload = { id, email }
        const accessToken = this.jwtService.sign(
            payload,
            {
                expiresIn: this.configService.get("JWT_EXPIRED"),
                secret: this.configService.get("JWT_SECRET")
            }
        )

        const refreshToken = this.jwtService.sign(
            payload,
            {
                expiresIn: this.configService.get("JWT_REFRESH_EXPIRED"),
                secret: this.configService.get("JWT_SECRET")
            }
        )

        return { accessToken, refreshToken }
    }

    async generateNewToken(dto: RefreshTokenDto) {
        const payload = await this.jwtService.verify(
            dto.refreshToken,
            { 
                secret: this.configService.get("JWT_SECRET")
            }
        )

        if(!payload) {
            throw new BadRequestException("Invalid Refresh Token!");
        }

        const user = await this.userService.getById(payload?.id)
        const newToken = await this.generateTokens(user.id as UUID, user.email)

        return newToken;
    }
}