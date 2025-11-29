import { createParamDecorator, ExecutionContext, NotFoundException } from "@nestjs/common";

export const ReqUser = createParamDecorator((data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    const user = request.user

    if(!user) {
        throw new NotFoundException('User not found')
    }

    return user
})