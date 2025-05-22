import { ClassRequest } from '../contracts';
import { DB } from '../core/database/db';
import { SuccessException } from '../core/exceptions';
import { FromTypeClassToModel as T2M, FromModelClassType as M2T } from '../convertors';
import { ClassesRepository } from '../repositories';
import { ClassOutput } from '../models';

export class ClassesService {
  private classesRepo: ClassesRepository;
  constructor() {
    this.classesRepo = new ClassesRepository();
  }

  public async create(request: ClassRequest): Promise<SuccessException> {
    const transaction = await DB.sequelize.transaction();
    try {
      const mapperOutput = T2M.toClasses(request.payload);
      const dbOutput: ClassOutput = await this.classesRepo.create(mapperOutput, transaction);
      const output = M2T.toClass(dbOutput);
      await transaction.commit();
      return new SuccessException('Class add successfully.', output);
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
