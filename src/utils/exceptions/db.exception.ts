import { HttpStatus, Logger } from '@nestjs/common';
import { BaseResponse } from '@utils/base.response';

export class DbExceptions {
  static handle(err): BaseResponse<null> {
    const logger = new Logger(DbExceptions.name);

    logger.error(err);
    return {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      data: null,
      message: err.message,
    };
  }
}
