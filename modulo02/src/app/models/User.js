// importa o model de dentro do sequelize
import Sequelize, { Model } from 'sequelize';
// fazer o hash da senha
import bcrypt from 'bcryptjs';

class User extends Model {
  // metodo que será automaticamente chamado pelo sequelize
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
        // se a senha não existir, criptografa a senha e o outro parâmetro é o numero de rounds (força) de criptografia
      }
    });

    return this;
  }
}

// hooks do sequelize, vai ser executado antes da criação

// o campo Virtual, quer dizer que esse campo nunca vai existir na base de dados, existe somente no lado do código

// sequelize que foi passado como parâmetro, precisa ser passado, também como um
// objeto

export default User;
