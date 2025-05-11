import { DB } from '../core/database/db';
import { BaseRepository } from './base.repository';
import { ProjectModel } from '../models';

export class ProjectsRepository extends BaseRepository<ProjectModel> {
  constructor() {
    super(DB.Projects);
  }
}
