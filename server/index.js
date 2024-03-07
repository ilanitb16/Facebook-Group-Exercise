// Required dependencies
require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const cors = require('cors');
const { mongo } = require("./utils");
const { ObjectId } = require("mongodb");
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

// Private key for JWT
const privateKey = 'privateKey';

// Array of routes that are not protected by JWT authorization
const notProtectedRoutes = ["/api/tokens", '/api/users'];

// Initialize Express app
const app = express();

// Connect to MongoDB using credentials from environment variables
let db = mongo(process.env.USER, process.env.PASS);

// Middleware setup
app.use(bodyParser.json({limit: '50mb'})); // Parse JSON bodies with limit
app.use(bodyParser.urlencoded({limit: '50mb', extended: true})); // Parse URL-encoded bodies with limit
app.use(express.json({limit: '50mb'})); // Parse JSON bodies
app.use(express.text()); // Parse text bodies
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded bodies
app.use(cors({ origin: true })); // Enable CORS
app.use(verifyToken); // JWT token verification middleware

// Routes
// GET endpoints
app.get('/api/posts', posts); // Get posts
app.get('/api/users/:id', getUser); // Get user by ID
app.get('/api/users/:id/posts', getUserPosts); // Get posts of a user
app.get('/api/users/:id/friends', getUserFriends); // Get friends of a user

// POST endpoints
app.post('/api/users', signUp); // User sign up
app.post('/api/tokens', signIn); // User sign in
app.post('/api/users/:id/posts', createPost); // Create a new post
app.post('/api/users/:id/friends', friendsRequest); // Send friend request

// PUT endpoints
app.put('/api/users/:id', updateUser); // Update user information
app.put('/api/users/:id/posts/:pid', updatePost); // Update a post

// DELETE endpoints
app.delete('/api/users/:id', deleteUser); // Delete user by ID
app.delete('/api/users/:id/posts/:pid', deletePost); // Delete a post
app.delete('/api/users/:id/friends/:fid', deleteFriendsRequest); // Delete friend request

// PATCH endpoint
app.patch('/api/users/:id/friends/:fid', approveFriendsRequest); // Approve friend request

// Start the server
app.listen(3000, () => {
    console.info(`Node.js app is listening at http://localhost:3000`);
});

// Function to handle successful responses
function ok(response, result) {
    if(!result.error){
        response.status(result.status).send(result.result);
    }
    else{
        response.status(500).send(result.result);
    }
}

// Middleware function to verify JWT token
function verifyToken(request, response, next) {
    let url = request.url;
    if(notProtectedRoutes.includes(url)) {
        next();
        return;
    };
    
    let token = request.header('Authorization');
    let result;
    
    try {
        if (!token){
            result = {status: 401, result: {message:"Access denied"}}
            ok(response, result);
            return;
        } 
        token = token.replace("Bearer ", "");
        const decoded = jwt.verify(token, privateKey);
        request.decoded = decoded;
        next()
    
    } catch (error) {
        result = {status: 401, result: {message:"Invalid token"}};
        ok(response, result);
    }
}

// Function to handle user signup
async function signUp(request, response, next){
    let result = {}; // Initialize result object
    let user = {}; // Initialize user object

    // Check if username is provided in request body
    if(request.body.username){
        // Search for existing user with the same username
        let searchedUser = await db.collection("users").findOne({username: request.body.username});
        if(searchedUser){
            // If user already exists, return conflict status with appropriate message
            result.status = 409;
            result.result = {message:"Username already exists"};
            ok(response, result); // Send response
            return;
        }
        else{
            // If username is unique, assign it to user object
            user.username = request.body.username;
        }
    }
    
    // Check if password is provided in request body
    if(request.body.password){
        user.password = request.body.password; // Assign password to user object
    }
    // Check if displayName is provided in request body
    if(request.body.displayName){
        user.displayName = request.body.displayName; // Assign displayName to user object
    }
    // Check if profilePic is provided in request body
    if(request.body.profilePic){
        user.profilePic = request.body.profilePic; // Assign profilePic to user object
    }

    try{
        // Insert the new user into the database
        let dbRes = await db.collection("users").insertOne(user);
        if(dbRes){
            // If insertion is successful, return success status with inserted ID
            result = {status:200, result:{insertedId:dbRes.insertedId}};
        }
        else{
            // If insertion fails, return server error status
            result = {status:500, result:{}};
        }
        ok(response, result); // Send response
        
    }
    catch(error){
        // If an error occurs during signup process, return server error status with error message
        result = {status:500, result:{error:error.message}};
        ok(response, result); // Send response
    }
}

// Function to handle user signin
async function signIn(request, response, next){
    let result = {}; // Initialize result object
    let user = {}; // Initialize user object
    let token; // Initialize token variable
    
    try{
        // Check if both username and password are provided in request body
        if(request.body.username && request.body.password){
            // Search for user with provided username and password
            let searchedUser = await db.collection("users").findOne({username: request.body.username, password: request.body.password});
            if(searchedUser){
                // If user is found, generate JWT token with user data and expiration time
                token = jwt.sign(request.body, privateKey, {
                    expiresIn: '400d',
                });
                result.status = 200; // Set status to success
                result.result = {user:searchedUser, token:token}; // Include user data and token in result
            }
            else{
                // If user is not found, set status to authentication failed
                result.status = 401;
                result.result = {message:"Authentication failed"};
            }
        }
        else{
            // If either username or password is missing, set status to request error
            result.status = 500;
            result.result = {message:"Request error"};
        }
        ok(response, result); // Send response
        
    }
    catch(error){
        // If an error occurs during signin process, return server error status with error message
        result = {status:500, result:{error:error.message}};
        ok(response, result); // Send response
    }

}

async function posts(request, response, next){
    let result;
    let dbFriendsPostsResult = [];
    let dbPostsResult = [];
    let dbResult
    try{
        let decoded = request.decoded;
        if(decoded){
            let user = {
                username:decoded.username, 
                password:decoded.password
            };

            let dbResultUser = await db.collection("users").findOne({username: user.username});
            if(dbResultUser.friends && dbResultUser.friends.length > 0){
                let friendsFilter = {$match: {username: {$in:dbResultUser.friends} }};
                let friendsPostsQuery = [
                    friendsFilter,
                    {$sort: {  'create_date': -1 }},
                    {$limit: 20 }

                ] 
                dbFriendsPostsResult = await db.collection("posts").aggregate(friendsPostsQuery).toArray();
                let notInclude = [...dbResultUser.friends];
                notInclude.push(dbResultUser.username)
                let filter = {$match: {username: {$not: {$in:notInclude}}}};
                let postsQuery = [
                    filter,
                    
                    {$sort: {  'create_date': -1 }},
                    {$limit: 5 }
                ] 
                dbPostsResult = await db.collection("posts").aggregate(postsQuery).toArray();

                dbResult = dbFriendsPostsResult.concat(dbPostsResult)
            }
            else{
                dbResult =  await db.collection("posts").find({username:{$ne:dbResultUser.username}}).sort({'create_date': -1}).limit(5).toArray();
            }
 
            result = {status:200, result: dbResult};
            ok(response, result);

        }
        else{
            result = {status: 500, result: {message:"Server error"}};
            ok(response, result); 
        }
    }
    catch(err){
        result = {status: 500, result: {message:err.message}};
        ok(response, result);
    }
    
}

// Function to retrieve user data based on username
async function getUser(request, response, next){
    try{
        let result; // Initialize result variable
        let dbResult = await db.collection("users").findOne({username: request.params.id}); // Query the database for user data
        
        // Check if user data is found
        if(dbResult){
            result = {status:200, result:dbResult}; // If found, set success status and include user data in result
        }
        else{
            result = {status:500, result: {message:"Server error"}}; // If not found, set server error status
        }
        ok(response, result); // Send response
    }
    catch(error){
        // If an error occurs during user retrieval, return server error status with error message
        result = {status:500, result:{error:error.message}};
        ok(response, result); // Send response
    }
}

// Function to delete a user based on ID
async function deleteUser(request, response, next){
    try{
        let result; // Initialize result variable
        let filter = {_id: new ObjectId(request.params.id)}; // Construct filter based on provided ID
        let dbResult = await db.collection("users").deleteOne(filter); // Delete user from database
        
        // Check if deletion is successful
        if(dbResult){
            result = {status:200, result:{deletedCount: dbResult.deletedCount}}; // If successful, set success status and include count of deleted items in result
        }
        else{
            result = {status:500, result: {message:"Server error"}}; // If deletion fails, set server error status
        }
        ok(response, result); // Send response
    }
    catch(error){
        // If an error occurs during user deletion, return server error status with error message
        result = {status:500, result:{error:error.message}};
        ok(response, result); // Send response
    }
}

// Function to update user data
async function updateUser(request, response, next){
    try{
        let result; // Initialize result variable
        let user = {}; // Initialize user object to store updated data
        let filter = {username: request.params.id}; // Construct filter based on provided username

        // Check request body for updated user data fields
        if(request.body.username){
            user.username = request.body.username; // Update username if provided
        }
        if(request.body.password){
            user.password = request.body.password; // Update password if provided
        }
        if(request.body.displayName){
            user.displayName = request.body.displayName; // Update display name if provided
        }
        if(request.body.profilePic){
            user.profilePic = request.body.profilePic; // Update profile picture if provided
        }
        if(request.body.friends){
            user.friends = request.body.friends; // Update friends list if provided
        }

        const updatedUser = {$set: user}; // Construct update object with updated user data
        let dbResult = await db.collection("users").updateOne(filter,updatedUser); // Update user data in the database
        
        // Check if update is successful
        if(dbResult){
            result = {status:200, result:{modifiedCount: dbResult.modifiedCount}}; // If successful, set success status and include count of modified items in result
        }
        else{
            result = {status:500, result: {message:"Server error"}}; // If update fails, set server error status
        }
        ok(response, result); // Send response
    }
    catch(error){
        // If an error occurs during user update, return server error status with error message
        result = {status:500, result:{error:error.message}};
        ok(response, result); // Send response
    }
}

// Function to retrieve posts for a user
async function getUserPosts(request, response, next){
    let result; // Initialize result variable
    
    try{
        let decoded = request.decoded; // Get decoded token containing user information
        let friend; // Initialize variable to check if requester is a friend

        if(decoded){ // Check if token is decoded successfully
            let username = request.params.id; // Get username from request parameters
            let authUser = {
                username:decoded.username, 
                password:decoded.password
            }; // Construct object containing authenticated user information

            if(authUser.username === username){ // Check if authenticated user is requesting their own posts
                let filter = {$match:{username: username }}; // Construct filter to match username
                query = [
                    filter, 
                    {$sort: {'create_date': -1 }}, // Sort posts by creation date in descending order
                ];

                let dbResult = await db.collection("posts").aggregate(query).toArray(); // Retrieve user's posts from the database
                if(dbResult){
                    result = {status:200, result: dbResult}; // If posts are found, set success status and include posts in result
                }
                else{
                    result = {status: 200, result: {message:"You have no posts"}}; // If no posts are found, set message in result
                }
                ok(response, result); // Send response
                return; // End function execution
            }

            // If requester is not the user themselves, check if they are a friend
            let user = await db.collection("users").findOne({username: username }); // Retrieve user information from database
            if(user && user.friends){ // Check if user exists and has friends
                friend = user.friends.find(friend => friend == authUser.username); // Check if authenticated user is a friend
                if(friend){ // If requester is a friend
                    let filter = {$match:{username: username }}; // Construct filter to match username
                    query = [
                        filter, 
                        {$sort: {'create_date': -1 }}, // Sort posts by creation date in descending order
                    ];

                    let dbResult = await db.collection("posts").aggregate(query).toArray(); // Retrieve user's posts from the database
                    result = {status:200, result: dbResult}; // Set success status and include posts in result
                }
                else{ // If requester is not a friend
                    result = {status:200, result: []}; // Set success status with empty result (no posts visible to requester)
                }
            }
            else{ // If user does not exist or has no friends
                result = {status:200, result: []}; // Set success status with empty result (no posts visible to requester)
            }
            
            ok(response, result); // Send response
        }
        else{ // If token decoding fails
            result = {status: 500, result: {message:"Server error"}}; // Set server error status
            ok(response, result); // Send response
        }
    }
    catch(err){
        // If an error occurs during post retrieval, return server error status with error message
        result = {status: 500, result: {message:err.message}};
        ok(response, result); // Send response
    }
}

// Function to create a new post
async function createPost(request, response, next){
    let result = {}; // Initialize result object
    let post = {}; // Initialize post object
    
    if(request.params.id){
        post.username = request.params.id; // Set post's username based on request parameter
    }

    // Check request body for post data fields
    if(request.body.description){
        post.description = request.body.description; // Set post description if provided
    }
    if(request.body.img){
        post.img = request.body.img; // Set post image if provided
    }
    if(request.body.title){
        post.title = request.body.title; // Set post title if provided
    }
    if(request.body.profilePic){
        post.profilePic = request.body.profilePic; // Set post profile picture if provided
    }
    if(request.body.date){
        post.date = request.body.date; // Set post date if provided
    }

    post.create_date = new Date().toISOString(); // Set post creation date to current date

    try{
        let dbRes = await db.collection("posts").insertOne(post); // Insert post into database
        if(dbRes){
            result = {status:200, result:{insertedId:dbRes.insertedId}}; // If successful, set success status and include inserted ID in result
        }
        else{
            result = {status:500, result: {message:"Server error"}}; // If insertion fails, set server error status
        }
        ok(response, result); // Send response
    }
    catch(error){
        // If an error occurs during post creation, return server error status with error message
        result = {status:500, result:{error:error.message}};
        ok(response, result); // Send response
    }
}

// Function to update a post
async function updatePost(request, response, next){
    try{
        let result; // Initialize result variable
        let post = {}; // Initialize post object
        let postId = request.params.pid; // Get post ID from request parameters
        let filter = {_id: new ObjectId(postId)}; // Construct filter based on post ID
        
        // Check request body for updated post data fields
        if(request.body.username){
            post.username = request.body.username; // Update post's username if provided
        }
        if(request.body.description){
            post.description = request.body.description; // Update post description if provided
        }
        if(request.body.img){
            post.img = request.body.img; // Update post image if provided
        }
        if(request.body.title){
            post.title = request.body.title; // Update post title if provided
        }
        if(request.body.profilePic){
            post.profilePic = request.body.profilePic; // Update post profile picture if provided
        }
        if(request.body.date){
            post.date = request.body.date; // Update post date if provided
        }
        if(request.body.create_date){
            post.create_date = request.body.create_date; // Update post creation date if provided
        }
        
        post.update_date = new Date().toISOString(); // Set post update date to current date

        const updatedPost = {$set: post}; // Construct update object with updated post data
        let dbResult = await db.collection("posts").updateOne(filter, updatedPost); // Update post in the database
        if(dbResult){
            result = {status:200, result:{modifiedCount: dbResult.modifiedCount}}; // If successful, set success status and include count of modified items in result
        }
        else{
            result = {status:500, result: {message:"Server error"}}; // If update fails, set server error status
        }
        ok(response, result); // Send response
    }
    catch(error){
        // If an error occurs during post update, return server error status with error message
        result = {status:500, result:{error:error.message}};
        ok(response, result); // Send response
    }
}

// Function to delete a post
async function deletePost(request, response, next){
    try{
        let result; // Initialize result variable
        let filter = {_id: new ObjectId(request.params.pid)}; // Construct filter based on post ID
        let dbResult = await db.collection("posts").deleteOne(filter); // Delete post from the database
        
        // Check if deletion is successful
        if(dbResult){
            result = {status:200, result:{deletedCount: dbResult.deletedCount}}; // If successful, set success status and include count of deleted items in result
        }
        else{
            result = {status:500, result: {message:"Server error"}}; // If deletion fails, set server error status
        }
        ok(response, result); // Send response
    }
    catch(error){
        // If an error occurs during post deletion, return server error status with error message
        result = {status:500, result:{error:error.message}};
        ok(response, result); // Send response
    }
}

// Function to retrieve friends of a user
async function getUserFriends(request, response, next){
    let result; // Initialize result variable
    try{
        let decoded = request.decoded; // Get decoded token containing user information
        if(decoded){ // Check if token is decoded successfully
            let username = request.params.id; // Get username from request parameters
            let authUser = {
                username:decoded.username, 
                password:decoded.password
            }; // Construct object containing authenticated user information

            let dbResponseAuthUser = await db.collection("users").findOne({username: authUser.username }); // Retrieve authenticated user information from database
            authUser.friends = dbResponseAuthUser.friends ? dbResponseAuthUser.friends : []; // Get friends list of authenticated user

            if(authUser.username === username || authUser.friends.includes(username)){ // Check if requested user is the authenticated user or a friend
                let dbResult = await db.collection("users").findOne({username: username}); // Retrieve user's information from the database
                result = {status:200, result: {username: dbResult.username, displayName:dbResult.displayName, friends: dbResult.friends}}; // If successful, set success status and include user's information in result
            }
            else{
                result = {status:200, result: []}; // If requester is not the user or a friend, return empty result
            }
            ok(response, result); // Send response
        }
        else{ // If token decoding fails
            result = {status: 500, result: {message:"Server error"}}; // Set server error status
            ok(response, result); // Send response
        }
    }
    catch(err){
        // If an error occurs during retrieval of user's friends, return server error status with error message
        result = {status: 500, result: {message:err.message}};
        ok(response, result); // Send response
    }
}

// Function to send a friend request
async function friendsRequest(request, response, next){
    
    let result; // Initialize result variable
    try{
        let decoded = request.decoded; // Get decoded token containing user information
        if(decoded){ // Check if token is decoded successfully
            let filter = {username:request.params.id}; // Construct filter based on requested user's ID
             
            let authUser = {
                username:decoded.username, 
                password:decoded.password
            }; // Construct object containing authenticated user information
            
            let user = await db.collection("users").findOne(filter); // Retrieve requested user's information from the database
            console.log(user);
            if(Array.isArray(user.friends) && user.friends.includes(authUser.username)){ // Check if authenticated user is already friends with requested user
                result = {status:200, result:{message:"You are already friends!"}}; // If already friends, return message
                ok(response, result); // Send response
                return; // End function execution
            };

            if(Array.isArray(user.friendsRequest) && user.friendsRequest.includes(authUser.username)){ // Check if friend request already exists
                result = {status:200, result:{message:"Friend request already exists!"}}; // If request exists, return message
                ok(response, result); // Send response
                return; // End function execution
            };

            if(Array.isArray(user.friendsRequest)){ // Check if user has existing friend requests
                user.friendsRequest.push(authUser.username); // Add authenticated user to friend requests
            }
            else{
                user.friendsRequest = []; // Initialize friend requests array if not exists
                user.friendsRequest.push(authUser.username); // Add authenticated user to friend requests
            }

            const updatedUser = {$set: user}; // Construct update object with updated user data
            let dbResult = await db.collection("users").updateOne(filter, updatedUser); // Update user's data in the database

            if(dbResult){
                result = {status:200, result:{modifiedCount: dbResult.modifiedCount}}; // If successful, set success status and include count of modified items in result
            }
            else{
                result = {status:500, result: {message:"Server error"}}; // If update fails, set server error status
            }
            ok(response, result); // Send response
        }
        else{ // If token decoding fails
            result = {status: 500, result: {message:"Server error"}}; // Set server error status
            ok(response, result); // Send response
        }
    }
    catch(err){
        console.log(err); // Log any errors to console
        // If an error occurs during friend request processing, return server error status with error message
        result = {status: 500, result: {message:err.message}};
        ok(response, result); // Send response
    }
}

// Function to approve a friend request
async function approveFriendsRequest(request, response, next){
    let result; // Initialize result variable
    try{
        let decoded = request.decoded; // Get decoded token containing user information
        if(decoded){ // Check if token is decoded successfully
            let fid = request.params.fid; // Get friend ID from request parameters
            let filter = {username:request.params.id}; // Construct filter based on user ID
            let fidFilter = {username:request.params.fid}; // Construct filter based on friend ID
            let authUser = {
                username:decoded.username, 
                password:decoded.password
            }; // Construct object containing authenticated user information

            if(authUser.username !== request.params.id){ // Check if authenticated user matches the user in request parameters
                result = {status:200, result:{message:"Unauthorized action"}}; // If not authorized, return unauthorized action message
                ok(response, result); // Send response
                return; // End function execution
            }
            
            let user = await db.collection("users").findOne(filter); // Retrieve user's information from the database
            let fidUser = await db.collection("users").findOne(fidFilter); // Retrieve friend's information from the database
            let requestIndex = user.friendsRequest.indexOf(fid); // Find index of friend request in user's friend requests array
            if(requestIndex > -1){ // Check if friend request exists
                user.friendsRequest.splice(requestIndex,1); // Remove friend request from user's friend requests array
                if(Array.isArray(user.friends)){ // Check if user has existing friends
                    user.friends.push(fid); // Add friend to user's friends array
                }
                else{
                    user.friends = []; // Initialize friends array if not exists
                    user.friends.push(fid); // Add friend to user's friends array
                }
            }
            if(Array.isArray(fidUser.friends)){ // Check if friend has existing friends
                fidUser.friends.push(request.params.id); // Add user to friend's friends array
            }
            else{
                fidUser.friends = []; // Initialize friends array if not exists
                fidUser.friends.push(request.params.id); // Add user to friend's friends array
            }
            const updatedUser = {$set: user}; // Construct update object with updated user data
            const updatedFidUser = {$set: fidUser}; // Construct update object with updated friend data
            let dbResultUser = await db.collection("users").updateOne(filter, updatedUser); // Update user's data in the database
            let dbResultFidUser = await db.collection("users").updateOne(fidFilter, updatedFidUser); // Update friend's data in the database
            if(dbResultUser){ // Check if user update is successful
                result = {status:200, result:{modifiedCount: dbResultUser.modifiedCount}}; // If successful, set success status and include count of modified items in result
            }
            else{
                result = {status:500, result: {message:"Server error"}}; // If user update fails, set server error status
            }
            ok(response, result); // Send response
            
        }
        else{ // If token decoding fails
            result = {status: 500, result: {message:"Server error"}}; // Set server error status
            ok(response, result); // Send response
        }
    }
    catch(err){
        // If an error occurs during friend request approval, return server error status with error message
        result = {status: 500, result: {message:err.message}};
        ok(response, result); // Send response
    }
}

// Function to delete a friend request
async function deleteFriendsRequest(request, response, next){
    let result; // Initialize result variable
    try{
        let decoded = request.decoded; // Get decoded token containing user information
        if(decoded){ // Check if token is decoded successfully
            let filter = {username:request.params.id}; // Construct filter based on user ID
            let friendRequest = request.params.fid; // Get friend request ID from request parameters
            let authUser = {
                username:decoded.username, 
                password:decoded.password
            }; // Construct object containing authenticated user information

            if(authUser.username !== request.params.id){ // Check if authenticated user matches the user in request parameters
                result = {status:200, result:{message:"Unauthorized action"}}; // If not authorized, return unauthorized action message
                ok(response, result); // Send response
                return; // End function execution
            }

            let user = await db.collection("users").findOne(filter); // Retrieve user's information from the database
            let requestIndex = user.friendsRequest.indexOf(friendRequest); // Find index of friend request in user's friend requests array
            if(requestIndex > -1){ // Check if friend request exists
                user.friendsRequest.splice(requestIndex,1); // Remove friend request from user's friend requests array
            }
            const updatedUser = {$set: user}; // Construct update object with updated user data
            let dbResult = await db.collection("users").updateOne(filter, updatedUser); // Update user's data in the database

            if(dbResult){ // Check if user update is successful
                result = {status:200, result:{modifiedCount: dbResult.modifiedCount}}; // If successful, set success status and include count of modified items in result
            }
            else{
                result = {status:500, result: {message:"Server error"}}; // If user update fails, set server error status
            }
            ok(response, result); // Send response
            
        }
        else{ // If token decoding fails
            result = {status: 500, result: {message:"Server error"}}; // Set server error status
            ok(response, result); // Send response
        }
    }
    catch(err){
        // If an error occurs during friend request deletion, return server error status with error message
        result = {status: 500, result: {message:err.message}};
        ok(response, result); // Send response
    }
}
