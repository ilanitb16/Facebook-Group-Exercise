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

