import { AuthenticationGuard } from './../utility/guards/authentication.guard';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common'; // Utilise `UseGuards` au lieu de `UseMiddleware`
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserSignupDto } from './dto/user-signup.dto';
import { UserEntity ,UserRole } from './entities/user.entity';
import { UserSignInDto } from './dto/user-signin.dto';
import { CurrentUser } from 'src/utility/decorators/current-user.decorator';
import { CurrentUserMiddleware } from 'src/utility/middlewares/current-user.middleware';
import { AuthorizeRoles } from 'src/utility/decorators/authorize-roles.decorator';
import { AuthorizeGuard } from 'src/utility/guards/authorization.guard';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async signup(@Body() userSignupDto: UserSignupDto): Promise<{ user: UserEntity }> {
    const user = await this.usersService.signup(userSignupDto);
    return { user };
  }

  @Post('signin')
  async signin(@Body() userSignInDto: UserSignInDto): Promise<{ accessToken: string, user: UserEntity }> {
    const user = await this.usersService.signin(userSignInDto);
    const accessToken = await this.usersService.accessToken(user);
    return { accessToken, user };
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): void {
    // Si aucune valeur n'est renvoyée, tu peux laisser vide ou renvoyer une réponse HTTP appropriée
    // Par exemple, pour une création réussie, tu pourrais renvoyer un code HTTP 201 CREATED
  }
  @AuthorizeRoles(UserRole.Recruteur)
  @UseGuards(AuthenticationGuard,AuthorizeGuard)
  @Get('all')
  async getAll(): Promise<UserEntity[]> {
    return await this.usersService.findAll();
  }

  @Get('single/:id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
  @UseGuards(AuthenticationGuard)
  @Get('me')
  @UseGuards(CurrentUserMiddleware) // Utilise `UseGuards` pour appliquer des middlewares dans les contrôleurs
  getProfile(@CurrentUser() currentUser: UserEntity) {
    return currentUser;
  }

  @Post('refresh-token')
  async refreshToken(@Body() user: UserEntity) {
    const refreshToken = await this.usersService.refreshToken(user);
    return { refreshToken };
  }
}
