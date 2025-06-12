import { ApiProperty, PickType } from '@nestjs/swagger';
import { UsersEntity } from '../entity/users.entity';
import { InheritParentDecorators } from '../../decorators/inherit-parent-decorators.decorator';
import { IsNotEmpty } from 'class-validator';

export class RegisterRequest extends PickType(UsersEntity, [
  'name',
  'email',
  'password',
]) {
  @ApiProperty({
    required: true,
  })
  @InheritParentDecorators()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    required: true,
  })
  @InheritParentDecorators()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    required: true,
  })
  @InheritParentDecorators()
  @IsNotEmpty()
  readonly password: string;
}
