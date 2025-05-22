import { SectionOutput } from '../../models';
import { ISections } from '../../types';
export class FromModelSectionType {
  public static toSections(payload: Array<SectionOutput>): Array<ISections> {
    return payload.map((i) => this.toSection(i));
  }
  public static toSection(payload: SectionOutput): ISections {
    return {
      id: payload.id,
      account_id: payload.account_id,
      class_id: payload.class_id,
      name: payload.name,
      capacity: payload.capacity,
      room_number: payload.room_number,
      is_active: payload.is_active,
      created_at: payload.created_at,
      updated_at: payload.updated_at,
      created_by: payload.created_by,
      updated_by: payload.updated_by,
    };
  }
}
