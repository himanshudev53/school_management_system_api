export interface IClasses {
  id: number;
  account_id: number;
  name: string;
  code: string | null;
  description: string | null;
  display_order: number;
  is_active: boolean;
  updated_at: Date;
  created_by: number | null;
  created_at: Date;
  updated_by: number | null;
}
export interface ISections {
  id: number;
  account_id: number;
  class_id: number;
  name: string;
  capacity: number | null;
  room_number: string | null;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
  created_by: number | null;
  updated_by: number | null;
}
