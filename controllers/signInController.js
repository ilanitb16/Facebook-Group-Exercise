const jwt = require('jsonwebtoken');
const SigninRequest = require("../models/signinRequestModel");
const {ok} = require("../utils");
const privateKey = 'privateKey';

module.exports.signInController = async (request, response, next) => {
    let result = {};
    let token;
    
    try{
        let signinRequest = new SigninRequest(request);
        let searchedUser = await request.db.collection("users").findOne({username: signinRequest.user, password: signinRequest.pass});

        if(searchedUser){
            token = jwt.sign(request.body, privateKey, {
                expiresIn: '400d',
            });
            result.status = 200;
            result.result = {user:searchedUser, token:token};
        }
        else{
            result.status = 401;
            result.result = {message:"Authentication failed"}
        }

        ok(response, result);
    }
    catch(error){
        result = {status:500, result:{error:error.message}}
        ok(response, result)
    }
}