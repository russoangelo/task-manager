import { UserService } from "src/user/user.service";
import { Injectable, NotFoundException } from "@nestjs/common";
import { LoginDto, RefreshTokenDto, RegisterDto } from "./dto/auth.request";
import * as bcrypt from "bcryptjs";
import { JwtAuthService } from "./jwt/jwt.service";
import { UUID } from "crypto";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtAuthService,
    ) {}

    async validateUser(email: string, pass: string) {
        const user = await this.userService.getByEmail(email);

        if(user && (await bcrypt.compare(pass, user.passwordHash))){
            const { passwordHash, ...result } = user;

            return result;
        }

        return null;
    }

    async register(dto: RegisterDto) {
        return await this.userService.create(dto);
    }
    
    async login(dto: LoginDto) {
        const user = await this.validateUser(dto.email, dto.password);

        if(!user) {
            throw new NotFoundException("User not found or invalid credentials")
        }

        const token = this.jwtService.generateTokens(user.id as UUID, user.email)

        return token;
    }

    async refreshToken(dto: RefreshTokenDto) {
        const token = this.jwtService.generateNewToken(dto)
        return token
    }
}