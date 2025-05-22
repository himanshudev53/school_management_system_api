import { ClassInput } from '../../models';
import { IClasses } from '../../types';
export class FromTypeClassToModel {
  public static toClasses(payload: IClasses): ClassInput {
    return {
      account_id: payload.account_id,
      name: payload.name,
      code: payload.code,
      description: payload.description,
      display_order: payload.display_order,
      is_active: true,
      updated_at: undefined,
      created_by: null,
      created_at: new Date(),
      updated_by: null,
    };
  }
}
