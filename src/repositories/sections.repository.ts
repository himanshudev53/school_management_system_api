import { DB } from '../core/database/db';
import { BaseRepository } from './base.repository';
import { SectionModel } from '../models';

export class SectionsRepository extends BaseRepository<SectionModel> {
  constructor() {
    super(DB.Section);
  }
}
