const path = require('path');
const {Post, PostBlock} = require('../db/models');
const fs = require('fs');

class PostController{
    async createPost(req, res){
        try{ 
            let blocks = [];
            if(req.body['post.blocks']){
                if(Array.isArray(req.body['post.blocks'])){
                    for(let i = 0;i < req.body['post.blocks'].length;i++){
                        blocks.push({
                            type: req.body['post.types'][i],
                            blockText: req.body['post.blocks'][i],
                            sortorder: i + 1,
                        });
                    }
                }else{
                    blocks.push({
                        type: req.body['post.types'],
                        blockText: req.body['post.blocks'],
                        sortorder: 1,
                    });
                }
            }
    
            let post = Post.build({
                title: req.body['post.title'],
                postText: req.body['post.postText'],
                topic_id: req.body['post.topic_id']
            });
    
            await post.save().then(function(){
                let postBlocks = blocks.map(function(block){
                    block.post_id = post.id;
                    return block;
                });
                PostBlock.bulkCreate(postBlocks).then(function(){
                    post.reload();
                });
            });

            return res.json({post: post, error: null});
        }catch(err){
            return res.json({error: 'Create post error: ' + err.message});
        }
    }

    async editPost(req, res){
        try{    
            await Post.update({
                title: req.body['post.title'],
                postText: req.body['post.postText']
            }, {
                where: {
                    id: req.body['post.id']
                }
            });

            let currentBlockIds = [];
            let postBlocks = await PostBlock.findAll({
                where: {
                    post_id: req.body['post.id']
                }
            });

            if(req.body['post.blocks']){
                if(Array.isArray(req.body['post.blocks'])){
                    for(let i = 0; i < req.body['post.blocks'].length; i++){
                        let blockData = {
                            type: req.body['post.types'][i],
                            blockText: req.body['post.blocks'][i],
                            sortorder: i + 1, 
                            post_id: req.body['post.id'] 
                        }
    
                        if(req.body['block.id'][i] == 'isNew'){
                            await PostBlock.create(blockData);
                        }else {    
                            currentBlockIds.push(+req.body['block.id'][i]);
                            await PostBlock.update(blockData, {
                                where:{
                                    id: +req.body['block.id'][i]
                                }
                            });
                        }
                    }
                }else{
                    let blockData = {
                        type: req.body['post.types'],
                        blockText: req.body['post.blocks'],
                        sortorder: 1, 
                        post_id: req.body['post.id'] 
                    }
    
                    if(req.body['block.id'] == 'isNew'){
                        await PostBlock.create(blockData);
                    }else {
                        currentBlockIds.push(+req.body['block.id']);
                        await PostBlock.update(blockData, {
                            where:{
                                id: +req.body['block.id']
                            }
                        });
                    }
                }
            }

            if(postBlocks.length > 0){
                postBlocks.forEach(function(block){
                    if(!currentBlockIds.includes(block.id)){
                        if(block.type == 'imageBlock'){
                            fs.unlink(path.resolve(__dirname, '../public/upload/' + block.blockText), (err) => {
                                if (err) throw err;
                                console.log('successfully deleted /public/upload/' + block.blockText);
                            });
                        }
                        
                        PostBlock.destroy({
                            where: {
                                id: block.id
                            }
                        });
                    }
                });
            }
    
            let post = await Post.findOne({
                where: {
                    id: req.body['post.id']
                },
                include:[
                    {model: PostBlock, as: 'blocks'}
                ]
            });
    
            return res.json({post: post, error: null});
        }catch(err){
            return res.json({error: 'Edit post error: ' + err.message});
        }
    }

    async uploadImage(req, res){
        if(req.files){
            try{
                req.files.image.mv(path.resolve(__dirname, '../public/upload/' + req.files.image.name));

                return res.json({
                    "success" : 1,
                    "file": {
                        "url": "/upload/" + req.files.image.name,
                        "text": req.files.image.name
                    }
                })

            }catch(err){
                return res.json({error: 'Image upload error: ' + err.message});
            }
        }
    }

    async removePost(req, res){
        const {id} = req.body;

        try{
            let post = await Post.findOne({
                where: {
                    id: id
                },
                include:[
                    {model: PostBlock, as: 'blocks'}
                ]
            });
    
            if(post && post.blocks.length > 0){
                post.blocks.forEach((block) => {
                    if(block.type == 'imageBlock'){
                        fs.unlink(path.resolve(__dirname, '../public/upload/' + block.blockText), (err) => {
                            if (err) throw err;
                            console.log('successfully deleted /public/upload/' + block.blockText);
                        });
                    }
                });
            }
    
            await Post.destroy({
                where: {
                    id: id
                }
            });
    
            return res.json({error: null});
        }catch(err){
            return res.json({error: 'Remove post error: ' + err.message});
        }
    }
}

module.exports = new PostController();