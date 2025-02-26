import { BaseDTO } from '../common/dto/base.dto';

export interface UserDTO extends BaseDTO {
  email: string;
  name: string;
}

export interface CreateUserDTO {
  email: string;
  password: string;
  name: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}


export interface IUser {
  id: string;
  email: string;
  password?: string;
  role?: string;
}
