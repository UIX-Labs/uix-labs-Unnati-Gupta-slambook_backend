//Create Document for slam book
const http = require('http');
const url = require('url');
const SlamBook = require('./model');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const endpoint = parsedUrl.pathname;
  const method = req.method;
  switch (method) {
    case 'GET':
      handleGetRequest(endpoint, parsedUrl, res);
      break;
    case 'POST':
      handlePostRequest(endpoint, req, res);
      break;
    case 'PUT':
      handlePutRequest(endpoint, req, res);
      break;
    case 'DELETE':
      handleDeleteRequest(endpoint, res);
      break;
    default:
      res.writeHead(405, { 'Content-Type': 'text/plain' });
      res.end('Method Not Allowed');
  }
});

const handlePostRequest = (endpoint, req, res) => {
  if (endpoint === '/slambook') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const entryData = JSON.parse(body);
      const newEntry = SlamBook.create(entryData);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newEntry));
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
};
const handleGetRequest = (endpoint, parsedUrl, res) => {
  if (endpoint === '/slambook') {
    if (parsedUrl.pathname === '/slambook' && !parsedUrl.query.id) {
      const entries = SlamBook.find();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(entries));
    } else if (parsedUrl.pathname === '/slambook' && parsedUrl.query.id) {
      const entry = SlamBook.findById(parsedUrl.query.id);
      if (entry) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(entry));
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Entry Not Found');
      }
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
};

const handlePutRequest = (endpoint, req, res) => {
  if (endpoint.startsWith('/slambook/')) {
    const entryId = endpoint.split('/').pop();
    let body = ' ';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const updateData = JSON.parse(body);

      const updatedEntry = SlamBook.findByIdAndUpdate(entryId, updateData);

      if (updatedEntry) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(updatedEntry));
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Entry Not Found');
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
};

const handleDeleteRequest = (endpoint, res) => {
  if (endpoint.startsWith('/slambook/')) {
    const entryId = endpoint.split('/').pop();

    const deletedEntry = SlamBook.findByIdAndDelete(entryId);

    if (deletedEntry) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(deletedEntry));
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Entry Not Found');
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
};

const PORT = 8000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
