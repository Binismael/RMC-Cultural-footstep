const http = require('http');

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>RMC Cultural Footstep</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          }
          .container {
            text-align: center;
            background: white;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
          }
          h1 {
            color: #333;
            margin: 0 0 20px 0;
          }
          p {
            color: #666;
            font-size: 16px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>RMC Cultural Footstep</h1>
          <p>Welcome! Your application is now running.</p>
        </div>
      </body>
    </html>
  `);
});

server.listen(port, () => {
  console.log(\`Server running at http://localhost:\${port}/\`);
});