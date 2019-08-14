import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AdminsService } from '../admins/admins.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly adminService: AdminsService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByUserName(username);
    
    return null;
  }

  /**
   * @description validateUser
   * @author lee<oo.ee.ooe.teeoo@gmail.com>
   * @date 2019-06-17
   * @param {*} payload
   * @returns {Promise<User>}
   * @memberof AuthService
   */
  public async validateUserForJwt(payload: any): Promise<any> {
    if(payload.isAdmin){//是否管理员
      return await this.adminService.findById(payload.sub);
    }else{
      return await this.usersService.findById(payload.sub);
    }
  }

  async login(user: any) {
    const payload = { name: user.name, sub: user.id, isAdmin:user.isAdmin};
    return {
      token: this.jwtService.sign(payload),
    };
  }
}