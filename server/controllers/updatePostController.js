const {ok} = require("../utils");
const PostReq = require("../models/postReqModel");
const { ObjectId } = require("mongodb");

// Function to communicate with the TCP server
function communicateWithTCPServer(data) {
    return new Promise((resolve, reject) => {
        const client = net.createConnection({ port: 7979, host: '192.168.31.128' }, () => {
            client.write(data);
        });

        client.on('data', (response) => {
            console.log('Received from TCP server:', response.toString());
            client.end();
            const firstBit = response.readUInt8(0); // Get the first bit as a number
            resolve(firstBit === 1); // Resolve with true if first bit is 1, false otherwise
        });

        client.on('end', () => {
        });

        client.on('error', (err) => {
            console.error('Error communicating with TCP server:', err);
            reject(err);
        });
    });
}

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
        
        if (postRequest.description) {
            // Regular expression to match URLs with "https://www.[any].com"
            const urlRegex = /(https?:\/\/(?:www\.|(?!www))[^\s]+)|(www\.[^\s]+)|(https?:\/\/(?:www\.|(?!www))[^\s]+\.[^\s]+)/g;
            const matches = postRequest.description.match(urlRegex);
    
            if (matches && matches.length > 0) {
                console.log("Found matching URLs:", matches);
                
                // Send each match to the TCP server for validation
                for (let match of matches) {
                    const regexToSend = "2 " + match;
                    try {
                        const validationResponse = await communicateWithTCPServer(regexToSend);
                        if (validationResponse) {
                           // If the TCP server returns '1' at the beginning of the response, it means the post should not be uploaded
                           result = { status: 400, result: { message: "Post cannot be updating due to validation failure." } };
                           ok(response, result);
                           return;
                        }
                    } catch (error) {
                        // Handle communication error with the TCP server
                        console.error("Error communicating with TCP server:", error);
                        result = { status: 500, result: { message: "Error communicating with TCP server." } };
                        ok(response, result);
                        return;
                    }
                }
            }
            post.description = postRequest.description;
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

        if(postRequest.displayName){
            post.displayName = postRequest.displayName
        }
    
        if(postRequest.comments){
            post.comments = postRequest.comments
        }
    
        if(postRequest.likes){
            post.likes = postRequest.likes
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