import { UsersEntity } from '../entity/users.entity';
import { OmitType } from '@nestjs/swagger';

export class UserResponse extends OmitType(UsersEntity, ['password']) {}
