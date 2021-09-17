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

        try{
            const topic = await Topic.create(params);
            return res.json({topic: topic, error: null});
        }catch (err){
            return res.json({error: 'Topic create error: ' + err.message});
        }
    }

    async edit(req, res){
        const {id, title} = req.body;

        let params = {
            id: id,
            title: title
        };

        try{
            await Topic.update(params, {
                where: {
                    id: params.id
                }
            });

            return res.json({error: null});
        }catch (err){
            return res.json({error: 'Topic edit error: ' + err.message});
        }
    }

    async delete(req, res){
        const {id} = req.body;

        try{
            await Topic.destroy({
                where: {
                    id: id
                }
            });

            return res.json({error: null});
        }catch (err){
            return res.json({error: 'TOpic delete error: ' + err.message});
        }
    }

    async getTopicsList(req, res){
        try{
            let topics = await Topic.findAll({
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
    
            return res.json({topics: topics, error: null});
        }catch(err){
            return res.json({error: 'Get topic list error: ' + err.message});
        }
    }
}

module.exports = new TopicController();