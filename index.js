// Import required libraries
require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const cors = require('cors');
const { mongo } = require("./utils");
const { ObjectId } = require("mongodb");
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

// Define private key for JWT
const privateKey = 'privateKey';

// Define routes that are not protected by JWT authentication
const notProtectedRoutes = ["/api/tokens", '/api/users'];

// Initialize Express app
const app = express();

// Initialize MongoDB connection
let db = null;

// Middleware to parse incoming request bodies
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json({limit: '50mb'}));
app.use(express.text());
app.use(express.urlencoded({ extended: false }));

// Enable CORS for all origins
app.use(cors({ origin: true }));

// Connect to MongoDB using credentials from environment variables
db = mongo(process.env.USER, process.env.PASS);

// Middleware function to verify JWT token for protected routes
app.use(verifyToken);

app.post('/api/users', signUp);
app.post('/api/tokens', signIn);
app.get('/api/users/:id', getUser);
app.delete('/api/users/:id', deleteUser);
app.get('/api/posts', posts);
app.post('/api/users/:id/posts', createPost);
app.put('/api/users/:id/posts/:pid', updatePost);
app.delete('/api/users/:id/posts/:pid', deletePost);

app.get('/check', (req, res) => ok(res, JSON.stringify({status: 200, time: new Date().toISOString()})));
app.get('/api/posts', posts);
app.get('/api/users/:id', getUser);
app.get('/api/users/:id/posts', getUserPosts);
app.get('/api/users/:id/friends', getUserFriends );

app.post('/api/users', signUp);
app.post('/api/tokens', signIn);
app.post('/api/users/:id/posts', createPost);
app.post('/api/users/:id/friends', friendsRequest );


app.put('/api/users/:id', updateUser);
app.put('/api/users/:id/posts/:pid', updatePost);

app.delete('/api/users/:id', deleteUser);
app.delete('/api/users/:id/posts/:pid', deletePost);
app.delete('/api/users/:id/friends/:fid', deleteFriendsRequest);

app.patch('/api/users/:id/friends/:fid', approveFriendsRequest )

app.get('/api/users/:id/posts', getUserPosts);
app.put('/api/users/:id', updateUser);
app.get('/api/users/:id', getUser);

// Start the server
app.listen(3000, () => {
    console.info("Node.js app is listening at http://localhost:3000");
});

// Function to send successful response
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
    // Check if the requested URL is in the list of not protected routes
    if(notProtectedRoutes.includes(url)) {
        // If yes, proceed to the next middleware
        next();
        return;
    };
    
    // Get the JWT token from the Authorization header
    let token = request.header('Authorization');
    let result;
    
    try {
        // Check if token exists
        if (!token){
            // If token is missing, send 401 Unauthorized response
            result = {status: 401, result: {message:"Access denied"}}
            ok(response, result);
            return;
        } 
        // Remove 'Bearer ' from the token string
        token = token.replace("Bearer ", "");
        // Verify the token using the private key
        const decoded = jwt.verify(token, privateKey);
        // Attach decoded token to request object for further use
        request.decoded = decoded;
        // Proceed to the next middleware
        next()
    
    } catch (error) {
        // If token verification fails, send 401 Unauthorized response
        result = {status: 401, result: {message:"Invalid token"}};
        ok(response, result);
    }
};

// Function to handle user sign-up
async function signUp(request, response, next){
    let result = {};
    let user = {};

    // Check if username is provided in the request body
    if(request.body.username){
        // Check if username already exists in the database
        let searchedUser = await db.collection("users").findOne({username: request.body.username});
        if(searchedUser){
            // If username exists, send 409 Conflict response
            result.status = 409;
            result.result = {message:"User name already exists"}
            ok(response, result);
            return
        }
        else{
            // If username is unique, add it to the user object
            user.username = request.body.username
        }
    }
    
    // Add password, display name, and profile picture to the user object if provided
    if(request.body.password){
        user.password = request.body.password
    }
    if(request.body.displayName){
        user.displayName = request.body.displayName
    }
    if(request.body.profilePic){
        user.profilePic = request.body.profilePic
    }

    try{
        // Insert the user object into the users collection in MongoDB
        let dbRes = await db.collection("users").insertOne(user);
        if(dbRes){
            // If insertion is successful, send 200 OK response with inserted user's ID
            result = {status:200, result:{insertedId:dbRes.insertedId}}
        }
        else{
            // If insertion fails, send 500 Internal Server Error response
            result = {status:500, result:{}}
        }
        ok(response, result)
        
    }
    catch(error){
        // If an error occurs during user registration, send 500 Internal Server Error response
        result = {status:500, result:{error:error.message}}
        ok(response, result)
    }
}

// Function to handle user sign-in
async function signIn(request, response, next){
    let result = {}; // Initialize an empty object to store the result
    let user = {}; // Initialize an empty object to store user data
    let token; // Initialize a variable to store the JWT token
    
    try{
        // Check if both username and password are provided in the request body
        if(request.body.username && request.body.password){
            // Search for a user in the database with the provided username and password
            let searchedUser = await db.collection("users").findOne({username: request.body.username, password: request.body.password});
            if(searchedUser){
                // If a user is found, generate a JWT token
                token = jwt.sign(request.body, privateKey, {
                    expiresIn: '200d', // Set token expiration time
                });
                // Set response status to 200 OK
                result.status = 200;
                // Set the result object with user data and token
                result.result = {user:searchedUser, token:token};
            }
            else{
                // If user authentication fails, set response status to 404 Not Found
                result.status = 404;
                result.result = "Authentication failed"
            }
        }
        else{
            // If either username or password is missing, set response status to 500 Internal Server Error
            result.status = 500;
            result.result = "Request error"
        }
        // Send response with the result
        ok(response, result);
        
    }
    catch(error){
        // If an error occurs during sign-in, send 500 Internal Server Error response
        result = {status:500, result:{error:error.message}}
        ok(response, result)
    }
}

// Function to fetch user data by username
async function getUser(request, response, next){
    try{
        let result; // Initialize a variable to store the result
        // Search for a user in the database with the provided username
        let dbResult = await db.collection("users").findOne({username: request.params.id});
        
        // Check if user data is found in the database
        if(dbResult){
            // If user data is found, set response status to 200 OK
            result = {status:200, result:dbResult}
        }
        else{
            // If user data is not found, set response status to 500 Internal Server Error
            result = {status:500, result: {message:"Server error"}}
        }
        // Send response with the result
        ok(response, result);
    }
    catch(error){
        // If an error occurs during user retrieval, send 500 Internal Server Error response
        result = {status:500, result:{error:error.message}}
        ok(response, result)
    }
}

// Function to handle a request to delete a user from a database
async function deleteUser(request, response, next){
    try{
        // Initialize variables
        let result;
        // Define filter to find user by username
        let filter = {username: request.params.id};
        // Delete user from the database
        let dbResult = await db.collection("users").deleteOne(filter);
        
        // Check if deletion was successful
        if(dbResult){
            // If successful, prepare response with status 200 and number of deleted documents
            result = {status:200, result:{deletedCount: dbResult.deletedCount}}
        }
        else{
            // If deletion failed, prepare response with status 500 and error message
            result = {status:500, result: {message:"Server error"}}
        }
        // Send response with the result
        ok(response, result);
    }
    catch(error){
        // If an error occurred during deletion, prepare response with status 500 and error message
        result = {status:500, result:{error:error.message}}
        // Send response with the error
        ok(response, result)
    }
}

// Function to handle the creation of a new post
async function createPost(request, response, next){
    let result = {}; // Object to store the result of the operation
    let post = {}; // Object to store the post data
    
    // Check if the request contains an ID parameter
    if(request.params.id){
        post.username = request.params.id // Assign the ID to the post's username
    }

    // Check if the request body contains a description
    if(request.body.description){
        post.description = request.body.description // Assign the description to the post
    }
    
    // Check if the request body contains an image
    if(request.body.img){
        post.img = request.body.img // Assign the image to the post
    }
    
    // Check if the request body contains a title
    if(request.body.title){
        post.title = request.body.title // Assign the title to the post
    }
    
    // Check if the request body contains a profile picture
    if(request.body.profilePic){
        post.profilePic = request.body.profilePic // Assign the profile picture to the post
    }
    
    // Check if the request body contains a date
    if(request.body.date){
        post.date = request.body.date // Assign the date to the post
    }

    // Add the current date to the post's creation date
    post.create_date = new Date().toISOString()

    try{
        // Attempt to insert the post into the database
        let dbRes = await db.collection("posts").insertOne(post);
        
        // If the insertion is successful
        if(dbRes){
            result = {status:200, result:{insertedId:dbRes.insertedId}} // Set the result with the inserted ID
        }
        else{
            result = {status:500, result: {message:"Server error"}} // Set a server error message
        }
        ok(response, result) // Send the result to the client
        
    }
    catch(error){
        result = {status:500, result:{error:error.message}} // Set an error message if there's an exception
        ok(response, result) // Send the error message to the client
    }
}

// Function to retrieve posts from the database and send them back as a response to the client
async function posts(request, response, next){
    let result; // To store the final result
    let dbFriendsPostsResult = []; // To store posts from friends
    let dbPostsResult = []; // To store other posts
    let dbResult; // To store the combined result
    try{
        let decoded = request.decoded; // Decoding the request, assuming it contains user information
        if(decoded){
            // Extracting user information from decoded data
            let user = {
                username:decoded.username, 
                password:decoded.password
            };

            // Querying the database to find the user's information
            let dbResultUser = await db.collection("users").findOne({username: user.username});
            console.log("dbResultUser", dbResultUser)

            // Checking if the user has friends
            if(dbResultUser.friends && dbResultUser.friends.length > 0){
                // If the user has friends, preparing a query to fetch their posts
                let friendsFilter = {$match: {username: {$in:dbResultUser.friends} }};
                let friendsPostsQuery = [
                    friendsFilter,
                    {$sort: {  'create_date': -1 }}, // Sorting posts by creation date
                    {$limit: 20 } // Limiting to 20 posts
                ] 
                // Executing the query to get posts from friends
                dbFriendsPostsResult = await db.collection("posts").aggregate(friendsPostsQuery).toArray();
                console.log("dbResultdbFriendsPostsResultUser", dbFriendsPostsResult);

                // Preparing a query to fetch posts from users who are not friends
                let filter = {$match: {username: {$not: {$in:dbResultUser.friends}} }};
                let postsQuery = [
                    filter,
                    {$sort: {  'create_date': -1 }}, // Sorting posts by creation date
                    {$limit: 5 } // Limiting to 5 posts
                ] 
                // Executing the query to get posts from non-friends
                dbPostsResult = await db.collection("posts").aggregate(postsQuery).toArray();
                console.log("dbPostsResult", dbPostsResult);

                // Combining the posts from friends and non-friends
                dbResult = dbFriendsPostsResult.concat(dbPostsResult)
            }
            else{
                // If the user has no friends, fetching the latest 5 posts
                dbResult =  await db.collection("posts").find().sort({'create_date': -1}).limit(5).toArray();
            }
 
            // Setting up the final result with a status of 200 and the combined posts
            result = {status:200, result: dbResult};
            ok(response, result); // Sending the result to the client
        }
        else{
            // If decoding failed or user information is not available, sending a server error message
            result = {status: 500, result: {message:"Server error"}};
            ok(response, result); 
        }
    }
    catch(err){
        // Catching any errors that occur during the execution and sending an error message
        result = {status: 500, result: {message:err.message}};
        ok(response, result);
    }
}
