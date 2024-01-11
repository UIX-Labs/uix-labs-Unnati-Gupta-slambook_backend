// TASK 1: Setting up server


const http = require('http');

const server = http.createServer((req, res) => {
    if(req.url === '/'){
  res.write('Hello World')
  res.end()}
});



server.listen(80)
console.log("Server listening on port 80")