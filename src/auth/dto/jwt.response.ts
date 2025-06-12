import { ApiProperty } from '@nestjs/swagger';

export class JwtResponse {
  @ApiProperty({
    example: 'Bearer',
  })
  readonly tokenType: string;

  @ApiProperty({
    example: 'Bearer token',
  })
  readonly token: string;
}
