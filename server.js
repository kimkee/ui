const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const os = require('os');

// 서버 설정
const SERVERLIST = [
  { name: '서버1', port: 8010, dirt: 'D:/workspace/project1/' },
  { name: '서버2', port: 8020, dirt: 'D:/workspace/project2/' },
  { name: '서버3', port: 8030, dirt: 'D:/workspace/kyobo/' },
];

// MIME 타입 매핑 (기존 + 추가 MIME 타입)
const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.json': 'application/json',
  '.txt': 'text/plain',
  '.ico': 'image/x-icon', // 추가: 파비콘
  '.mp4': 'video/mp4', // 추가: 비디오
  '.mp3': 'audio/mpeg', // 추가: 오디오
  '.pdf': 'application/pdf' // 추가: PDF
};

function getMimeType(ext) {
  return MIME_TYPES[ext.toLowerCase()] || 'application/octet-stream';
}

// 공통 핸들러 함수 (dirt를 매개변수로 받아서 사용)
function createHandler(dirt) {
  return (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    let pathname = parsedUrl.pathname;

    // 루트 경로(/)일 때는 index.html로 처리
    if (pathname === '/') {
      pathname = '/index.html';
    }

    // 파일 경로 구성 (절대 경로 사용)
    const filePath = path.join(dirt, pathname.replace(/\.\.\//g, '')); // .. 공격 방지

    fs.stat(filePath, (err, stats) => {
      if (err) {
        // 파일 없음
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('404 Not Found');
        return;
      }

      if (stats.isDirectory()) {
        // 디렉토리면 index.html 시도
        const indexPath = path.join(filePath, 'index.html');
        fs.stat(indexPath, (indexErr, indexStats) => {
          if (indexErr) {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('404 Not Found');
            return;
          }
          serveFile(indexPath, req, res);
        });
        return;
      }

      // 파일이면 서빙
      serveFile(filePath, req, res);
    });
  };
}

function serveFile(filePath, req, res) {
  const ext = path.extname(filePath);
  const mimeType = getMimeType(ext);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('500 Internal Server Error');
      return;
    }
    res.writeHead(200, { 'Content-Type': mimeType });
    res.end(data);
  });
}

// Get local IP address
const networkInterfaces = os.networkInterfaces();
let localIP = '127.0.0.1';

// Find the local IPv4 address
Object.keys(networkInterfaces).forEach((interfaceName) => {
  networkInterfaces[interfaceName].forEach((interface) => {
    if (interface.family === 'IPv4' && !interface.internal) {
      localIP = interface.address;
    }
  });
});

function startServer(name, port, dirt) {
  const server = http.createServer(createHandler(dirt));
  server.listen(port, '0.0.0.0', () => {
    console.log(`${name} : http://localhost:${port} OR http://${localIP}:${port}, 디렉토리: ${dirt}`);
  });
}

SERVERLIST.forEach((server) => startServer(server.name, server.port, server.dirt));
