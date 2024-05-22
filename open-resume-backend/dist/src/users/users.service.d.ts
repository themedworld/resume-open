import { UserSignInDto } from './dto/user-signin.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UserSignupDto } from './dto/user-signup.dto';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<UserEntity>);
    signup(userSignupDto: UserSignupDto): Promise<UserEntity>;
    signin(userSignInDto: UserSignInDto): Promise<UserEntity>;
    create(createUserDto: CreateUserDto): string;
    findAll(): Promise<UserEntity[]>;
    findOne(id: number): Promise<UserEntity>;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: number): string;
    findUserByUsername(username: string): Promise<UserEntity>;
    accessToken(user: UserEntity): Promise<any>;
    refreshToken(user: UserEntity): Promise<any>;
    getUserWithResumeAndCusSecAndLanguage(): Promise<UserEntity[]>;
    findUsersByRole(role: any): Promise<UserEntity[]>;
}
