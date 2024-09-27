import { Sequelize } from "sequelize";
import EnvVars from "@src/constants/EnvVars";

const sequelize = new Sequelize({
  dialect: "mysql", // Or your preferred database dialect
  replication: {
    read: [
      {
        database: EnvVars.DB.DATABASE,
        username: EnvVars.DB.USERNAME,
        password: EnvVars.DB.PASSWORD,
        host: EnvVars.DB.READER_HOST,
      },
    ],
    write: {
      database: EnvVars.DB.DATABASE,
      username: EnvVars.DB.USERNAME,
      password: EnvVars.DB.PASSWORD,
      host: EnvVars.DB.HOST,
    },
  },
  logging: false,
});

export default sequelize;
