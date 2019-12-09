module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'avatar_id', {
      type: Sequelize.INTEGER,
      // chave estrangeira (tabela files, chave id)
      references: { model: 'files', key: 'id' },
      onUpdate: 'CASCADE',  // se for alterado, ela ocorre no BD
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'avatar_id');
  },
};


