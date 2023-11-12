// Create web server application to handle comments
// 1. Create web server
// 2. Create route to handle comments
// 3. Read comments from file
// 4. Return comments to client
// 5. Add comment to file
// 6. Return result to client

// Import modules
const http = require('http');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');

// Create web server
const server = http.createServer((req, res) => {
    // Create route to handle comments
    if (req.url === '/comment' && req.method === 'GET') {
        // Read comments from file
        fs.readFile(path.join(__dirname, 'comments.json'), 'utf8', (err, data) => {
            if (err) {
                console.log(err);
            } else {
                // Return comments to client
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(data);
            }
        });
    } else if (req.url === '/comment' && req.method === 'POST') {
        // Read data from client
        let body = '';
        req.on('data', chunk => {
            body += chunk;
        });
        req.on('end', () => {
            // Convert data from JSON to JavaScript object
            const comment = qs.parse(body);
            // Read comments from file
            fs.readFile(path.join(__dirname, 'comments.json'), 'utf8', (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    // Convert data from JSON to JavaScript object
                    const comments = JSON.parse(data);
                    // Add comment to file
                    comments.push(comment);
                    // Convert data from JavaScript object to JSON
                    const commentsJSON = JSON.stringify(comments);
                    // Write comments to file
                    fs.writeFile(path.join(__dirname, 'comments.json'), commentsJSON, err => {
                        if (err) {
                            console.log(err);
                        } else {
                            // Return result to client
                            res.writeHead(200, { 'Content-Type': 'text/plain' });
                            res.end('Comment added!');
                        }
                    });
                }
            });
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not found');
    }
});

// Start listening
server.listen(3000
