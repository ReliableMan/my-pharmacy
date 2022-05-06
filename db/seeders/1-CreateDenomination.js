module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Denominations', [{
      name: 'Обезболивающие',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Витамины и добавки',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Болезни суставов',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Офтальмологические средства',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Детские подгузники',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Товары для диабетиков',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Медицинские приборы',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Лекарства от ОРВИ и гриппа',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Denominations', null, {});
  },
};
