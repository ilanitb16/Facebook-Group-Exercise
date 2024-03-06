// Import required MongoDB client
const MongoClient = require('mongodb').MongoClient;

// Export function for establishing MongoDB connection
module.exports.mongo = (user, pass) => {
    // Construct MongoDB connection string with provided username and password
    const MONGODB_CONNECTION = `mongodb+srv://${user}:${pass}@cluster0.cs944.gcp.mongodb.net/?retryWrites=true&w=majority`
    
    // Create a new MongoClient instance using the connection string
    // Select 'barilan' database as the default database for this connection
    return new MongoClient(MONGODB_CONNECTION).db("barilan");
}
