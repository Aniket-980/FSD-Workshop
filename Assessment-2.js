const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const directory = path.join(__dirname, 'files');

if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
}

const server = http.createServer((req, res) => {

 
    if (req.method === 'POST' && req.url.startsWith('/files/')) {

        const fileName = req.url.split('/files/')[1];
        const filePath = path.join(directory, fileName);

        let data = "";

        req.on('data', (chunk) => {
            data += chunk;
        });

        req.on('end', () => {

            fs.writeFile(filePath, data, (err) => {

                if (err) {
                    res.writeHead(500);
                    res.end('Error writing file');
                    return;
                }

                res.writeHead(200);
                res.end('File written successfully');
            });
        });
    }

    else if (req.method === 'GET' && req.url.startsWith('/files/')) {

        const fileName = req.url.split('/files/')[1];
        const filePath = path.join(directory, fileName);

        fs.readFile(filePath, (err, data) => {

            if (err) {
                res.writeHead(404);
                res.end('File not found');
                return;
            }

            res.writeHead(200);
            res.end(data);
        });
    }

   
    else if (req.method === 'DELETE' && req.url.startsWith('/files/')) {

        const fileName = req.url.split('/files/')[1];
        const filePath = path.join(directory, fileName);

        fs.unlink(filePath, (err) => {

            if (err) {
                res.writeHead(404);
                res.end('Error deleting file');
                return;
            }

            res.writeHead(200);
            res.end('File deleted successfully');
        });
    }

else if (req.method === 'PUT' && req.url.startsWith('/files/')) {
    const fileName = req.url.split('/files/')[1];
        const filePath = path.join(directory, fileName);

        let data = "";

        req.on('data', (chunk) => {
            data += chunk;
        });

        req.on('end', () => {

            fs.writeFile(filePath, data, (err) => {

                if (err) {
                    res.writeHead(500);
                    res.end('Error writing file');
                    return;
                }

                res.writeHead(200);
                res.end('File updated successfully');
            });
        });
    }
    else {
        res.writeHead(404);
        res.end('Route not found');
    }
});
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});