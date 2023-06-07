import { CACHE_MANAGER, CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";
import { Request } from 'express';
import { Cache } from "cache-manager";

@Injectable()
export class CustomGurd implements CanActivate{

    private constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache,private jwtService : JwtService){}

    async canActivate(context: ExecutionContext): Promise<boolean>{
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if(!token){
            throw new UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(
              token,
              {
                secret: 'secret'
              }
            );       
            request['user'] = payload;
          } catch {
            throw new UnauthorizedException();
          }
          console.log(token);
          const outputCacheToken = await this.cacheManager.get(token);
          console.log(outputCacheToken);
          if(outputCacheToken){
            await this.cacheManager.set(token , true , 10000);
          }else{
            throw new UnauthorizedException("Sorry the token is not in the cache");
          }
          

        return true;
    }
    
    private extractTokenFromHeader(request : Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
      }
}