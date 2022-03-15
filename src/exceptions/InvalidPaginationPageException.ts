import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidPaginationPageException extends HttpException {
  constructor() {
    super(
      'Pagination page is invalid. May be it is less than 0.',
      HttpStatus.BAD_REQUEST,
    );
  }
}
