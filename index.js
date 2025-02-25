
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
  
  const contentTypes = {
    '.html': 'text/html',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.json': 'application/json',
    '.js': 'application/javascript'
  };
  
  const ext = path.extname(filePath);
  const contentType = contentTypes[ext] || 'text/plain';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end('File not found');
      return;
    }
    
    res.writeHead(200, {
      'Content-Type': contentType,
      'Content-Security-Policy': "default-src 'self' https: 'unsafe-inline'",
      'Access-Control-Allow-Origin': '*'
    });
    res.end(content);
  });
});

server.listen(3000, '0.0.0.0', () => {
  console.log('Server running on port 3000');
});
