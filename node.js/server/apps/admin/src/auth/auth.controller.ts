import { Controller, Body, Post, Get, UseGuards, Req } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiProperty, ApiBasicAuth, ApiBearerAuth } from '@nestjs/swagger'
import { InjectModel } from 'nestjs-typegoose'
import { User } from '@libs/db/models/user/user.model'
import { ReturnModelType, DocumentType } from '@typegoose/typegoose'
import { AuthGuard } from '@nestjs/passport'
import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'
import { JwtService } from '@nestjs/jwt'
import { CurrentUser } from './decorator/current-user.decorator'
@Controller('auth')
@ApiTags('管理员用户')
export class AuthController {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User) private userModel: ReturnModelType<typeof User>
  ) {}
  @Post('registier')
  @ApiOperation({ summary: '注册' })
  async register(@Body() dto: RegisterDto) {
    const { username, password } = dto
    const user = await this.userModel.create({
      username: username,
      password: password
    })
    return user
  }
  @Post('login')
  @ApiOperation({ summary: '登陆' })
  @UseGuards(AuthGuard('local'))
  async login(@Body() dto: LoginDto, @Req() req) {
    return {
      token: this.jwtService.sign(String(req.user._id)),
    }
  }

  @Post('userinfo')
  @ApiOperation({ summary: '获取用户信息' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async info(@CurrentUser() user: DocumentType<User>) {
      return user
  }
  @Post('logout')
  @ApiOperation({ summary: '获取用户信息' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async logout(@CurrentUser() user: DocumentType<User>) {
      return user
  }
}
