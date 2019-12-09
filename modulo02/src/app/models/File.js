// importa o model de dentro do sequelize
import Sequelize, { Model } from 'sequelize';

class File extends Model {
  // metodo que será automaticamente chamado pelo sequelize
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {   // front end consegue acessar o caminho do arquivo
            return `http://localhost:3333/files/${this.path}`;
          },
        },
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

// o campo Virtual, quer dizer que esse campo nunca vai existir na base de dados, existe somente no lado do código

// sequelize que foi passado como parâmetro, precisa ser passado, também como um
// objeto

export default File;
