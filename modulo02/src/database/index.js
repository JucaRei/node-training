// Conexão com o banco de dados e carregar as Models
import Sequelize from 'sequelize';
import mongoose from 'mongoose'

// importar os models
import User from '../app/models/User';
import File from '../app/models/File';
import Appointment from '../app/models/Appointment'

// importar as configurações do Banco de Dados
import databaseConfig from '../config/database';

const models = [User, File, Appointment];

// método init faz a conexão com o banco de dados e carrega os models
class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    // conexão com o banco
    this.connection = new Sequelize(databaseConfig);

    // associate (File)
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  // mongodb
  mongo() {
    this.mongoConnection = mongoose.connect(
      'mongodb://localhost:27017/gobarber',
      { useNewUrlParser: true, useFindAndModify: true, useUnifiedTopology: true }
    )
    /**
     * useNewUrlParser - formato de url mongo mais nova
     * useFindAndModify - outra maneira quando for modificar registros
     */
  }
}

export default new Database();
