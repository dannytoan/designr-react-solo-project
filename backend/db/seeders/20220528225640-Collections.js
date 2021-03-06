'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Collections', [
     {
     userId: 1,
     title: 'Fall 2022 Moodbard',
     coverImg: "https://64.media.tumblr.com/8a5443cf3d0d35c9e099b2737dfe94a4/6fac35e56ea1c3f3-c5/s540x810/def62a072d0c3f39e8ec55d184a298ed3565767a.jpg",
     createdAt: new Date(),
     updatedAt: new Date(),
   },
     {
     userId: 1,
     title: 'Spring 2023 Moodboard',
     coverImg: "https://64.media.tumblr.com/5c2a9744b0a7510787a2162caba3c487/79c3d499e0936214-56/s500x750/4c266aa4d906aee481366840bf563b59994cb2ec.jpg",
     createdAt: new Date(),
     updatedAt: new Date(),
   }
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Collections', null, {});
  }
};
