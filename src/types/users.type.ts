interface IUser {
  id: number;
  email: string;
  password: string;
  salt_password: string;
  is_active: boolean;
  created_at: Date;
  created_by: number;
  updated_at: Date;
  updated_by: number;
}
export { IUser };
