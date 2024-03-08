import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserSignupDto } from './dto/user-signup.dto';
import { UserEntity } from './entities/user.entity';
import { UserSignInDto } from './dto/user-signin.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    signup(userSignupDto: UserSignupDto): Promise<{
        user: UserEntity;
    }>;
    signin(userSignInDto: UserSignInDto): Promise<{
        accessToken: string;
        user: UserEntity;
    }>;
    create(createUserDto: CreateUserDto): void;
    getAll(): Promise<UserEntity[]>;
    findOne(id: string): Promise<UserEntity>;
    update(id: string, updateUserDto: UpdateUserDto): string;
    remove(id: string): string;
    getProfile(currentUser: UserEntity): UserEntity;
    refreshToken(user: UserEntity): Promise<{
        refreshToken: string;
    }>;
}
