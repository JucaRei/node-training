// Conexão com o banco de dados e carregar as Models
import Sequelize from 'sequelize';

// importar os models
import User from '../app/models/User';
import File from '../app/models/File';

// importar as configurações do Banco de Dados
import databaseConfig from '../config/database';

const models = [User, File];

// método init faz a conexão com o banco de dados e carrega os models
class Database {
  constructor() {
    this.init();
  }

  init() {
    // conexão com o banco
    this.connection = new Sequelize(databaseConfig);

    // associate (File)
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
