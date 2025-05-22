import { ClassOutput } from '../../models';
import { IClasses } from '../../types';
export class FromModelClassType {
  public static toClasses(payload: Array<ClassOutput>): Array<IClasses> {
    return payload.map((i) => this.toClass(i));
  }
  public static toClass(payload: ClassOutput): IClasses {
    return {
      id: payload.id,
      account_id: payload.account_id,
      name: payload.name,
      code: payload.code,
      description: payload.description,
      display_order: payload.display_order,
      is_active: true,
      updated_at: payload.updated_at,
      created_by: null,
      created_at: new Date(),
      updated_by: null,
    };
  }
}
