const {ok} = require("../utils");
const PostReq = require("../models/postReqModel");

module.exports.createPostController = async (request, response, next) => {
    let result = {};
    let post = {};
    let postRequest = new PostReq(request);
    
    if(request.params.id){
        post.username = request.params.id
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

    post.create_date = new Date().toISOString()

    try{
        let dbRes = await request.db.collection("posts").insertOne(post);
        if(dbRes){
            result = {status:200, result:{insertedId:dbRes.insertedId}}
        }
        else{
            result = {status:500, result: {message:"Server error"}}
        }
        ok(response, result)
        
    }
    catch(error){
        result = {status:500, result:{error:error.message}}
        ok(response, result)
    }

}