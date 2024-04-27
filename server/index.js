require('dotenv').config()

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const net = require('net');
const {verifyToken} = require("./middleware/verifyToken");
const {mongodbInjector} = require("./middleware/mongodbInjector");

const accountRoutes = require("./routes/accountRoutes");
const friendsRoutes = require("./routes/friendsRoutes");
const postsRoutes = require("./routes/postsRoutes");

const app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json({limit: '50mb'}));
app.use(express.text());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: true }));
app.use(verifyToken);
app.use(mongodbInjector);

function communicateWithTCPServer(data) {
    return new Promise((resolve, reject) => {
        const client = net.createConnection({ port: 7979, host: '192.168.31.128' }, () => {
            client.write(data);
        });

        client.on('data', (response) => {
            console.log('Received from TCP server:', response.toString());
            client.end();
            const firstBit = response.readUInt8(0); // Get the first bit as a number
            resolve(firstBit === 1); // Resolve with true if first bit is 1, false otherwise
        });

        client.on('end', () => {
        });

        client.on('error', (err) => {
            console.error('Error communicating with TCP server:', err);
            reject(err);
        });
    });
}



// Function to setup the server
async function setupServer() {
    try {
        //the setting of the bits array
        const response = await communicateWithTCPServer("16 1 2");
        console.log(response);

        // Send each line to the TCP server
        const lines = [
            "https://www.youtube.com",
            "https://www.twitter.com",
            "https://www.invalidweb.com",
            "https://www.notgood.com"
        ];

        for (let line of lines) {
            const isFirstBitOne = await communicateWithTCPServer(`1 ${line}`);
            console.log(`"${line}":`, isFirstBitOne);
        }
        console.log("Server setup completed successfully.");




    } catch (error) {
        console.error("Error setting up server:", error);
        process.exit(1);
    }
}



// Start the server and setup tasks
async function startServer() {
    try {
        await setupServer();
        app.use("/api", accountRoutes);
        app.use("/api", friendsRoutes);
        app.use("/api", postsRoutes);
        app.listen(3000, () => {
            console.info(`Node.js app is listening at http://localhost:3000`);
        });
    } catch (error) {
        console.error("Error starting server:", error);
        process.exit(1);
    }
}

startServer();