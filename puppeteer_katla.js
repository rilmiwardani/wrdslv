const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const server = http.createServer((req, res) => {
    let filePath = '.' + req.url;
    if (filePath == './') filePath = './index.html';
    const extname = path.extname(filePath);
    let contentType = 'text/html';
    switch (extname) {
        case '.js': contentType = 'text/javascript'; break;
        case '.css': contentType = 'text/css'; break;
        case '.json': contentType = 'application/json'; break;
    }
    fs.readFile(filePath, (error, content) => {
        if (error) { res.writeHead(404); res.end('Error'); }
        else { res.writeHead(200, { 'Content-Type': contentType }); res.end(content, 'utf-8'); }
    });
});

server.listen(8123, async () => {
    console.log('Server running');
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
    page.on('pageerror', err => console.log('BROWSER ERROR:', err.message));
    
    await page.goto('http://localhost:8123', { waitUntil: 'networkidle2' });
    
    // Select KATLA.json
    await page.select('#dict-source', 'KATLA.json');
    await new Promise(r => setTimeout(r, 1000));
    
    await browser.close();
    server.close();
});
