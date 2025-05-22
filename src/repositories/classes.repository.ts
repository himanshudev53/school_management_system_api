import { DB } from '../core/database/db';
import { BaseRepository } from './base.repository';
import { ClassModel } from '../models';

export class ClassesRepository extends BaseRepository<ClassModel> {
  constructor() {
    super(DB.Class);
  }
}
