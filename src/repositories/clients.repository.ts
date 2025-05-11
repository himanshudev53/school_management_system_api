import { DB } from '../core/database/db';
import { BaseRepository } from './base.repository';
import { ClientModel, ClientOutput } from '../models';

export class ClientRepository extends BaseRepository<ClientModel> {
  constructor() {
    super(DB.Clients);
  }

  public async findByEmail(email: string): Promise<ClientOutput | null> {
    return await this.model.findOne({ where: { email } });
  }
}
