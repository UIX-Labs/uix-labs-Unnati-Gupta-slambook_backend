// TASK 3 : Use mongoose instead of mongodb driver

const http = require("http");
const mongoose = require("mongoose");

const PORT = 8000;

const uri =
  "mongodb+srv://unnatig1920:unnatigupta@cluster0.uokvn7o.mongodb.net/";

async function startServer() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    const server = http.createServer((req, res) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      res.end("Hello World\n");
    });

    server.listen((PORT) => {
      console.log("Server running");
    });
  } catch (err) {
    console.error("Could not connect to MongoDB:", err);
    process.exit(1);
  }
}

startServer();
