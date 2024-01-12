// Task 2 : Connecting with mongo db data base 
const http = require("http");
const { MongoClient } = require("mongodb");

const PORT = 8000;
const uri =
  "mongodb+srv://unnatig1920:unnatigupta@cluster0.uokvn7o.mongodb.net/";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function startServer() {
  try {
    await client.connect();
    console.log("Connected to Mongo Database");

    const server = http.createServer((req, res) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      res.end("Hello World\n");
    });

    server.listen(PORT, () => {
      console.log("Server running");
    });
  } catch (err) {
    console.error("Could not connect to MongoDB:", err);
    process.exit(1);
  }
}

startServer();
