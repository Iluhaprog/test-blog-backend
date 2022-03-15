import { HttpException, HttpStatus } from '@nestjs/common';

export class NotOwnerException extends HttpException {
  constructor() {
    super('You is not owner for this post.', HttpStatus.FORBIDDEN);
  }
}
