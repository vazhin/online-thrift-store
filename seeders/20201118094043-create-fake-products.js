'use strict';

function createRecords() {
  const categories = ['clothes', 'furniture', 'computer', 'mobile device'];
  const conditions = [
    'new with tags',
    'like-new',
    'gently-used',
    'signs of use',
  ];
  const records = [];
  for (let i = 0; i < 20; i++) {
    records.push({
      name: 'Product Name',
      price: 37 + i,
      currency: 'USD',
      phoneNumber: '07680006600',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nec convallis arcu. Pellentesque eu dui quis felis sagittis aliquam. In hac habitasse platea dictumst. Mauris volutpat lectus ac urna mattis, ac mattis nunc vehicula.',
      condition: conditions[Math.floor(Math.random() * conditions.length)],
      category: categories[Math.floor(Math.random() * categories.length)],
      city: 'Erbil',
      image: 'uploads/products/1605641021210-156853.jpg',
      productId: i + '67b680a-3655-40e0-a3c9-a6722b5a1c1d',
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  return records;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('products', createRecords());
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('products', null);
  },
};
