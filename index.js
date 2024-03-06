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
