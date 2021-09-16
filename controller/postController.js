const path = require('path');
const {Post, PostBlock} = require('../db/models');
const fs = require('fs');

class PostController{
    async createPost(req, res){
        if(req.files){
            if(Array.isArray(req.files['post.images'])){
                req.files['post.images'].forEach(function(image){
                    image.mv(path.resolve(__dirname, '../public/upload/' + image.name));
                });
            }else{
                req.files['post.images'].mv(path.resolve(__dirname, '../public/upload/' + req.files['post.images'].name));
            }
        }

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

        return res.json(post);
    }

    async editPost(req, res){
        if(req.files){
            if(Array.isArray(req.files['post.images'])){
                req.files['post.images'].forEach(function(image){
                    image.mv(path.resolve(__dirname, '../public/upload/' + image.name));
                });
            }else{
                req.files['post.images'].mv(path.resolve(__dirname, '../public/upload/' + req.files['post.images'].name));
            }
        }

        await Post.update({
            title: req.body['post.title'],
            postText: req.body['post.postText']
        }, {
            where: {
                id: req.body['post.id']
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
                        let tmpBlock = await PostBlock.findOne({
                            where: {
                                id: +req.body['block.id'][i]
                            }
                        });

                        if(tmpBlock && tmpBlock.type == 'imageBlock'){
                            if(tmpBlock.blockText !== blockData.blockText){
                                fs.unlink(path.resolve(__dirname, '../public/upload/' + tmpBlock.blockText), (err) => {
                                    if (err) throw err;
                                    console.log('successfully deleted /public/upload/' + tmpBlock.blockText);
                                });
                            }
                        }

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
                    let tmpBlock = await PostBlock.findOne({
                        where: {
                            id: +req.body['block.id']
                        }
                    });

                    if(tmpBlock && tmpBlock.type == 'imageBlock'){
                        if(tmpBlock.blockText != blockData.blockText){
                            fs.unlink(path.resolve(__dirname, '../public/upload/' + tmpBlock.blockText), (err) => {
                                if (err) throw err;
                                console.log('successfully deleted /public/upload/' + tmpBlock.blockText);
                            });
                        }
                    }

                    await PostBlock.update(blockData, {
                        where:{
                            id: +req.body['block.id']
                        }
                    });
                }
            }
        }

        let post = await Post.findOne({
            where: {
                id: req.body['post.id']
            },
            include:[
                {model: PostBlock, as: 'blocks'}
            ]
        });

        return res.json(post);
    }

    async removePost(req, res){
        const {id} = req.body;

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

        return res.json({'error' : 0});
    }

    async removePostBlock(req, res){
        const {id} = req.body;

        let block = await PostBlock.findOne({
            where: {
                id: id
            }
        });

        if(block.type == 'imageBlock'){
            fs.unlink(path.resolve(__dirname, '../public/upload/' + block.blockText), (err) => {
                if (err) throw err;
                console.log('successfully deleted /public/upload/' + block.blockText);
            });
        }

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