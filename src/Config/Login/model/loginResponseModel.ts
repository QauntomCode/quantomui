import { UserModel } from "../../User/model/user";

export interface LoginResponse {
    User?: UserModel; // Assuming a corresponding `User` model exists
    IsValid?: boolean;
    Token?: string;
    Message?: string;
  }
  