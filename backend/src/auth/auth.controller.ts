import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto, RefreshTokenDto, RegisterDto } from "./dto/auth.request";
import { JwtGuard } from "./jwt/jwt.guard";
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller('auth')
export class AuthConntroller {
    constructor(private readonly authService: AuthService) {}

    @Post('/login')
    async login(@Body() dto: LoginDto) {
        return this.authService.login(dto);
    }

    @Post('/register')
    async register(@Body() dto: RegisterDto) {
        return this.authService.register(dto)
    }

    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    @Post('/refresh-token')
    async refreshToken(@Body() dto: RefreshTokenDto) {
        return this.authService.refreshToken(dto)
    }
}