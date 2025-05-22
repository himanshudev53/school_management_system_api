import { SectionRequest } from '../contracts';
import { DB } from '../core/database/db';
import { SuccessException } from '../core/exceptions';
import { FromTypeSectionToModel as T2M, FromModelSectionType as M2T } from '../convertors';
import { SectionsRepository } from '../repositories';
import { SectionOutput } from '../models';

export class SectionsService {
  private classesRepo: SectionsRepository;
  constructor() {
    this.classesRepo = new SectionsRepository();
  }

  public async create(request: SectionRequest): Promise<SuccessException> {
    const transaction = await DB.sequelize.transaction();
    try {
      const mapperOutput = T2M.toSections(request.payload);
      const dbOutput: Array<SectionOutput> = await this.classesRepo.bulkCreate(mapperOutput, transaction);
      const output = M2T.toSections(dbOutput);
      await transaction.commit();
      return new SuccessException('Section add successfully.', output);
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
