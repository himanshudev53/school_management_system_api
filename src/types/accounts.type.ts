interface IAccounts {
  id: number;
  name: string;
  slug: string;
  logo: string;
  email: string;
  is_active: boolean;
  created_at: Date;
  created_by: number;
  updated_at: Date;
  updated_by: number;
}
export { IAccounts };
