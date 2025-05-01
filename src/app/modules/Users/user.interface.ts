import { Role } from '@prisma/client';

export type IUser = {
  name: string;
  email: string;
  password: string;
  role: Role;
};
