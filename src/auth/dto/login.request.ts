import { ApiProperty, PickType } from '@nestjs/swagger';
import { UsersEntity } from '../entity/users.entity';
import { InheritParentDecorators } from '../../decorators/inherit-parent-decorators.decorator';

export class LoginRequest extends PickType(UsersEntity, ['email', 'password']) {
  @ApiProperty({
    required: true,
  })
  @InheritParentDecorators()
  readonly email: string;

  @ApiProperty({
    required: true,
  })
  readonly password: string;
}
