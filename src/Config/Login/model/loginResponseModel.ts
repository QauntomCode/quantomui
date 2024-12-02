import { user } from "../../User/model/user";

export interface LoginResponse {
    User?: user; // Assuming a corresponding `User` model exists
    IsValid?: boolean;
    Token?: string;
    Message?: string;
  }
  