const {ok} = require("../utils");
const PostReq = require("../models/postReqModel");
const { ObjectId } = require("mongodb");

module.exports.updatePostController = async (request, response, next) => {
    try{
        let result;
        let post = {};
        let postId = request.params.pid;
        let filter = {_id: new ObjectId(postId)};
        let postRequest = new PostReq(request);
        
        if(postRequest.username){
            post.username = postRequest.username
        }
        if(postRequest.description){
            post.description = postRequest.description
        }
        if(postRequest.img){
            post.img = postRequest.img
        }
        if(postRequest.title){
            post.title = postRequest.title
        }
        if(postRequest.profilePic){
            post.profilePic = postRequest.profilePic
        }
        if(postRequest.date){
            post.date = postRequest.date
        }
        if(postRequest.create_date){
            post.create_date = postRequest.create_date
        }
        
        post.update_date = new Date().toISOString()

        const updatedPost = {$set: post};
        let dbResult = await request.db.collection("posts").updateOne(filter, updatedPost);
        if(dbResult){
            result = {status:200, result:{modifiedCount: dbResult.modifiedCount}}
        }
        else{
            result = {status:500, result: {message:"Server error"}}
        }
        ok(response, result);
    }
    catch(error){
        result = {status:500, result:{error:error.message}}
        ok(response, result)
    }
    

}