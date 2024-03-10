require('dotenv').config()

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const {verifyToken} = require("./middleware/verifyToken");
const {mongodbInjector} = require("./middleware/mongodbInjector");
const {signInController} = require("./controllers/signInController");
const {signUpController} = require("./controllers/signUpController");
const {postsController} = require("./controllers/postsController");
const {getUserController} = require("./controllers/getUserController");
const {deleteUserController} = require("./controllers/deleteUserController");
const {getUserFriendsController} = require("./controllers/getUserFriendsController");
const {updatePostController} = require("./controllers/updatePostController");
const {getUserPostsController} = require("./controllers/getUserPostsController");
const {createPostController} = require("./controllers/createPostController");
const {friendsRequestController} = require("./controllers/friendsRequestController");
const {deleteFriendsRequestController} = require("./controllers/deleteFriendsRequestController");
const {approveFriendsRequestController} = require("./controllers/approveFriendsRequestController");
const {updateUserController} = require("./controllers/updateUserController");
const {deletePostController} = require("./controllers/deletePostController");

const app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json({limit: '50mb'}));
app.use(express.text());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: true }));
app.use(verifyToken);
app.use(mongodbInjector);

app.get('/api/posts', postsController);
app.get('/api/users/:id', getUserController);
app.get('/api/users/:id/posts', getUserPostsController);
app.get('/api/users/:id/friends', getUserFriendsController );

app.post('/api/users', signUpController);
app.post('/api/tokens', signInController);
app.post('/api/users/:id/posts', createPostController);
app.post('/api/users/:id/friends', friendsRequestController );

app.put('/api/users/:id', updateUserController);
app.put('/api/users/:id/posts/:pid', updatePostController);

app.delete('/api/users/:id', deleteUserController);
app.delete('/api/users/:id/posts/:pid', deletePostController);
app.delete('/api/users/:id/friends/:fid', deleteFriendsRequestController);

app.patch('/api/users/:id/friends/:fid', approveFriendsRequestController )


app.listen(3000, () => {
    console.info(`Node.js app is listening at http://localhost:3000`);
});






