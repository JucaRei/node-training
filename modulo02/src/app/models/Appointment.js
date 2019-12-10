// importa o model de dentro do sequelize
import Sequelize, { Model } from 'sequelize';

class Appointment extends Model {
  // metodo que será automaticamente chamado pelo sequelize
  static init(sequelize) {
    super.init(
      {
        date: Sequelize.DATE,
        canceled_at: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.User, { foreignKey: 'provider_id', as: 'provider' });
  }
}

// o campo Virtual, quer dizer que esse campo nunca vai existir na base de dados, existe somente no lado do código

// sequelize que foi passado como parâmetro, precisa ser passado, também como um
// objeto

export default Appointment;
