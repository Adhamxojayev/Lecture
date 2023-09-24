import { USER_ROLE } from './enums';

export type TOKEN = {
  id: number;
  username: string;
  role: USER_ROLE;
};
