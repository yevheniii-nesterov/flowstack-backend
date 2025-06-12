import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Users } from 'generated/client.js';

export class UsersEntity implements Users {
  @ApiProperty({
    example: 'uuidv4',
    description: 'User UUID',
    type: String,
    format: 'UUIDv4',
  })
  @IsUUID()
  readonly id: string;

  @ApiProperty({
    example: 'name surname',
    description: 'User UUID',
    type: String,
  })
  @IsString()
  @MaxLength(64)
  readonly name: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'User email',
    type: String,
  })
  @IsEmail()
  @MaxLength(128)
  readonly email: string;

  @ApiProperty({
    example: 'string',
    description: 'User password',
    type: String,
  })
  @IsString()
  @MinLength(8)
  @MaxLength(64)
  readonly password: string;
}
