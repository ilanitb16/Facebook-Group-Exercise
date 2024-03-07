const MongoClient = require('mongodb').MongoClient;


module.exports.mongo = (user, pass) => {
    const MONGODB_CONNECTION = `mongodb+srv://${user}:${pass}@ilanitber.f9tpkql.mongodb.net/?retryWrites=true&w=majority`
    return new MongoClient(MONGODB_CONNECTION).db("barilan");
}