// import { IService } from "../interfaces/IService";
// import DemandService from "../../services/demandService";

import { IService } from '../interfaces';

export class ServiceFactory {
  public static createService(serviceType: string): IService<any> {
    switch (serviceType) {
      case 'Demand':
      // return new DemandService();
      default:
        throw new Error('Invalid service type');
    }
  }
}
