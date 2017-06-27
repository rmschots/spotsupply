import { LoginUser } from '../account/login-user';
export class UsersSearchResult {
  users: LoginUser[];
  pages: number;
  page: number;
  filter: string;
}
