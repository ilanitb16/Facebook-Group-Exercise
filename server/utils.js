const MongoClient = require('mongodb').MongoClient;


module.exports.mongo = (user, pass) => {
    const MONGODB_CONNECTION = `mongodb+srv://${user}:${pass}@ilanitber.f9tpkql.mongodb.net/?retryWrites=true&w=majority`
    return new MongoClient(MONGODB_CONNECTION).db("barilan");
}

module.exports.generateGuid = () => {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let result = '';

    for ( let i = 0; i < 9; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return result;
}

