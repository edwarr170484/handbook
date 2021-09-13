const {Topic, Post, PostBlock} = require('../db/models');

class PostController{
    async create(req, res){
        let post = Post.build({
            title: req.body.title,
            postText: req.body.postText,
            topic_id: req.body.topic_id,
            blocks: req.body.blocks
        });

        await post.save().then(function(){
            let postBlocks = req.body.blocks.map(function(block){
                block.post_id = post.id;
                return block;
            });
            PostBlock.bulkCreate(postBlocks).then(function(){
                post.reload();
            });
        });

        return res.json(post);
    }

    async edit(req, res){
        const post = req.body;

        await Post.update({
            id: post.id,
            title: post.title,
            postText: post.postText,
            blocks: post.blocks
        }, {
            where: {
                id: post.id
            }
        });

        if(post.blocks.length > 0){
            post.blocks.forEach(function(block, index, blocks){
                if(block.isNew){
                    PostBlock.create({
                        type: block.type,
                        blockText: block.blockText,
                        sortorder: post.blocks.length + index,
                        post_id: block.post_id
                    });
                }else{
                    PostBlock.update({blockText: block.blockText}, {
                        where:{
                            id: block.id
                        }
                    });
                }
            });
        }

        return res.json(post);
    }

    async remove(req, res){
        const {id} = req.body;

        await Post.destroy({
            where: {
                id: id
            }
        });

        return res.json({'error' : 0});
    }

    async deleteBlock(req, res){
        const {id} = req.body;

        await PostBlock.destroy({
            where: {
                id: id
            }
        });

        return res.json({'error' : 0});
    }

    async getPost(req, res){
        const {postId} = req.params;
        
        let post = await Post.findOne({
            where: {
                id: postId
            },
            include:[
                {model: PostBlock, as: 'blocks'}
            ]
        });

        return res.json(post);
    }
}

module.exports = new PostController();