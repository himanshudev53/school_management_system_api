import { SectionInput } from '../../models';
import { ISections } from '../../types';
export class FromTypeSectionToModel {
  public static toSections(payload: Array<ISections>): Array<SectionInput> {
    return payload.map((section) => ({
      account_id: section.account_id,
      class_id: section.class_id,
      name: section.name,
      capacity: section.capacity,
      room_number: section.room_number,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
      created_by: null,
      updated_by: null,
    }));
  }
}
