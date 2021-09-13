const sequelize = require('./connect');
const {Sequelize} = require('sequelize');

const Topic = sequelize.define('topic', {
    id: {type: Sequelize.INTEGER,  autoIncrement: true, primaryKey: true},
    title: {type: Sequelize.STRING, allowNull: false},
    sortorder: {type: Sequelize.INTEGER, allowNull: false}
});

const Post = sequelize.define('post', {
    id: {type: Sequelize.INTEGER,  autoIncrement: true, primaryKey: true},
    title: {type: Sequelize.STRING, allowNull: false},
    postText: {type: Sequelize.TEXT, allowNull: true}
});

const PostBlock = sequelize.define('postblock', {
    id: {type: Sequelize.INTEGER,  autoIncrement: true, primaryKey: true},
    type: {type: Sequelize.STRING, allowNull: true},
    blockText: {type: Sequelize.TEXT, allowNull: true},
    sortorder: {type: Sequelize.INTEGER, allowNull: false},
});

Topic.hasMany(Post,{
    foreignKey: 'topic_id',
    as: 'posts',
    onDelete: 'CASCADE',
    hooks: true
});

Topic.hasMany(Topic, {
    as: 'children',
    foreignKey: 'parent_id',
    onDelete: 'CASCADE',
    hooks: true
});

Post.hasMany(PostBlock, {
    foreignKey: 'post_id',
    as: 'blocks',
    onDelete: 'CASCADE',
    onUpdate : 'CASCADE',
    hooks: true
});

module.exports = {
    Topic, Post, PostBlock
}