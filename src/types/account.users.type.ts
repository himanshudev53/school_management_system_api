interface IAccountUser {
  id: number;
  user_id: number;
  account_id: number;
  role_id: number;
  is_active: boolean;
  created_at: Date;
  created_by: number;
  updated_at: Date;
  updated_by: number;
}
export { IAccountUser };
