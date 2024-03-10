const { mongo } = require("../utils");

let db = mongo(process.env.USER, process.env.PASS);

module.exports.mongodbInjector = (request, response, next) => {
    request.db = db;
    next();
};
