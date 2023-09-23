import { Request } from '@nestjs/common';

export interface I_TOKEN {
  access_token: string;
  refresh_token: string;
}

export interface iReq extends Request {
  user: any;
}
