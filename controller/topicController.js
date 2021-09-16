const {Topic, Post, PostBlock} = require('../db/models');

class TopicController{
    async create(req, res){
        const {title, sortorder, parent_id} = req.body;
        
        let params = {
            title: title,
            sortorder: sortorder
        };

        if(parent_id){
            params.parent_id = parent_id;
        }

        const topic = await Topic.create(params);
    
        return res.json(topic);
    }

    async edit(req, res){
        const {id, title} = req.body;

        let params = {
            id: id,
            title: title
        };

        const topic = await Topic.update(params, {
            where: {
                id: params.id
            }
        });

        return res.json(params);
    }

    async delete(req, res){
        const {id} = req.body;

        await Topic.destroy({
            where: {
                id: id
            }
        });

        return res.json({'error' : 0});
    }

    async getTopicsList(req, res){
        const topics = await Topic.findAll({
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

        return res.json(topics);
    }
}

module.exports = new TopicController();