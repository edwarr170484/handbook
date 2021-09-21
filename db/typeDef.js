const {GraphQLID, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList} = require('graphql');
const {Topic, Post, PostBlock} = require('./models');

const postBlockType =  new GraphQLObjectType({
    name: 'PostBlock',
    fields: {
        id: {type: GraphQLID},
        type: {type: GraphQLString},
        blockText: {type: GraphQLString},
        post_id: {type: GraphQLID}
    }
});

const postType = new GraphQLObjectType({
    name: 'Post',
    fields: {
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        topic_id: {type: GraphQLID},
        blocks: {
            type: new GraphQLList(postBlockType),
            resolve: async function(post){
                return await PostBlock.findAll({
                    where:{
                        post_id: post.id
                    },
                    order:[
                        ['sortorder', 'ASC']
                    ]
                });
            }
        }
    }
})
const topicChildType =  new GraphQLObjectType({
    name: 'TopicChild',
    fields:{
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        sortorder: {type: GraphQLInt},
        parent_id: {type: GraphQLInt},
        posts: {
            type: new GraphQLList(postType),
            resolve: async function(topic){
                return await Post.findAll({
                    where:{
                        topic_id: topic.id
                    },
                    order:[
                        ['id', 'ASC']
                    ]
                });
            }
        }
    }
})
const topicType = new GraphQLObjectType({
    name: 'Topic',
    fields: {
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        sortorder: {type: GraphQLInt},
        parent_id: {type: GraphQLInt},
        children: {
            type: new GraphQLList(topicChildType),
            resolve: async function(topic){
                return await Topic.findAll({
                    where:{
                        parent_id: topic.id
                    },
                    include:[{
                        model: Topic,
                        as: 'children'
                    },{
                        model: Post,
                        as: 'posts'
                    }],
                    order:[
                        ['id', 'ASC']
                    ]
                });
            }
        },
        posts: {
            type: new GraphQLList(postType),
            resolve: async function(topic){
                return await Post.findAll({
                    where:{
                        topic_id: topic.id
                    },
                    order:[
                        ['id', 'ASC']
                    ]
                });
            }
        }
    }
});

const treeType = new GraphQLObjectType({
    name: 'Tree',
    fields: {
        topics: {
            type: new GraphQLList(topicType),
            resolve: async function(){
                return await Topic.findAll({
                    where:{
                        parent_id: null
                    },
                    include:[{
                        model: Topic,
                        as: 'children'
                    },{
                        model: Post,
                        as: 'posts'
                    }],
                    order:[
                        ['id', 'ASC']
                    ]
                });
            }
        },
        post: {
            type: postType,
            args: {
                post_id:{type: GraphQLID}
            },
            resolve: async function(source, args){
                return await Post.findOne({
                    where: {
                        id: args.post_id
                    },
                    include:[
                        {model: PostBlock, as: 'blocks'}
                    ]
                });
            }
        }
    }
});

module.exports = treeType;