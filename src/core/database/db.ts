import Sequelize from 'sequelize';
import { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME, DB_PORT } from '../../config';
import { Logger } from '../../core/utils';
import ClientsModel from '../../models/clients.model';
import ProjectsModel from '../../models/projects.model';
import SurveysModel from '../../models/surveys.model';
import SurveyQualificationModel from '../../models/survey-qualification.model';
import SurveyQualificationConditionModel from '../../models/survey-qualification-condition.model';
export const sequelize = new Sequelize.Sequelize(String(DB_NAME), String(DB_USERNAME), String(DB_PASSWORD), {
  dialect: 'postgres',
  host: String(DB_HOST),
  port: Number(DB_PORT),
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    underscored: true,
    freezeTableName: true,
  },
  pool: {
    min: 0,
    max: 5,
  },
  dialectOptions: {
    typeCast: true,
    ssl: {
      require: true, //?The server does not support SSL connections
      rejectUnauthorized: false,
    },
  },
  timezone: 'Etc/UTC', //? Assuming you want to use UTC timezone
  logging: (query, time) => {
    Logger.info(`${time}ms ${query}`);
  },
  benchmark: true,
  // sync: { force: true }, //! This for sync database
});

sequelize.authenticate();

const DB = {
  Clients: ClientsModel(sequelize),
  Projects: ProjectsModel(sequelize),
  Surveys: SurveysModel(sequelize),
  SurveyQualification: SurveyQualificationModel(sequelize),
  SurveyQualificationCondition: SurveyQualificationConditionModel(sequelize),
  sequelize, //? connection instance (RAW queries)
  Sequelize, //? library
};

export { DB as DB };
