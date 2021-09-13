module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.changeColumn(
            'topics', 
            'parent_id', 
            {
              type: Sequelize.INTEGER,
              references: {
                model: 'Topic', 
                key: 'id', 
              },
              onDelete: 'CASCADE',
            }
        );
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.changeColumn(
            'topics', 
            'parent_id', 
            {
              type: Sequelize.INTEGER,
              references: {
                model: 'Topic', 
                key: 'id', 
              },
              onDelete: 'CASCADE',
            }
        );
    }
}