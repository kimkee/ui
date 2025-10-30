const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const os = require('os');

// 서버 설정
const SERVERLIST = [
  { name: '서버1', port: 8010, dirt: 'D:/workspace/project1/' },
  { name: '서버2', port: 8020, dirt: 'D:/workspace/project2/' },
  { name: '서버3', port: 8030, dirt: 'D:/workspace/project3/' },
];

// 전역 서버 인스턴스 저장소
const servers = {};

// MIME 타입 매핑
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
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.mp3': 'audio/mpeg',
  '.pdf': 'application/pdf'
};

function getMimeType(ext) {
  return MIME_TYPES[ext.toLowerCase()] || 'application/octet-stream';
}

// 공통 핸들러 함수
function createHandler(dirt, port) {
  return (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    let pathname = parsedUrl.pathname;

    // === 개별 종료 ===
    if (pathname === '/shutdown') {
      res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(`포트 ${port} 서버 즉시 종료 중...`);
      console.log(`[즉시 종료] 포트 ${port} 서버 종료 요청`);
      
      // 즉시 종료 시작 (지연 없음)
      stopServer(port);
      return;
    }

    // === 전체 종료 ===
    if (pathname === '/shutdown-all') {
      res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(`모든 서버 즉시 종료 중... (총 ${Object.keys(servers).length}개)`);
      console.log(`[즉시 전체 종료] 요청 수신`);
      
      // 즉시 전체 종료
      stopAllServers();
      return;
    }

    // === 일반 파일 서빙 ===
    if (pathname === '/') pathname = '/index.html';
    const filePath = path.join(dirt, pathname.replace(/\.\.\//g, ''));

    fs.stat(filePath, (err, stats) => {
      if (err || !stats) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('404 Not Found');
        return;
      }

      if (stats.isDirectory()) {
        const indexPath = path.join(filePath, 'index.html');
        fs.stat(indexPath, (idxErr) => {
          if (idxErr) {
            res.writeHead(404);
            res.end('404 Not Found');
            return;
          }
          serveFile(indexPath, req, res);
        });
        return;
      }

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

// 로컬 IP
let localIP = '127.0.0.1';
Object.values(os.networkInterfaces()).flat().forEach(iface => {
  if (iface.family === 'IPv4' && !iface.internal) localIP = iface.address;
});

// 서버 시작
function startServer(name, port, dirt) {
  const handler = createHandler(dirt, port);
  const server = http.createServer(handler);
  
  server.listen(port, '0.0.0.0', () => {
    console.log(`${name} : http://localhost:${port}/shutdown → 즉시 종료`);
    console.log(`    http://localhost:${port}/shutdown-all → 전체 즉시 종료`);
    console.log(`    디렉토리: ${dirt}`);
  });

  servers[port] = server;
}

// === 즉시 종료: 개별 ===
function stopServer(port) {
  const server = servers[port];
  if (!server) {
    console.log(`포트 ${port} 서버 없음`);
    return;
  }

  console.log(`포트 ${port} 서버 즉시 종료 중...`);

  // 모든 연결 강제 종료 (Node.js 18+)
  if (server.closeAllConnections) {
    server.closeAllConnections();
  }

  server.close(() => {
    console.log(`포트 ${port} 서버 완전히 종료됨`);
    delete servers[port];
  });

  // 1초 후 강제 종료 (안전장치)
  setTimeout(() => {
    if (servers[port]) {
      console.log(`포트 ${port} 강제 종료`);
      delete servers[port];
      process.exit(0);
    }
  }, 1000);
}

// === 즉시 종료: 전체 ===
function stopAllServers() {
  const ports = Object.keys(servers);
  if (ports.length === 0) {
    console.log('종료할 서버 없음');
    return;
  }

  console.log(`모든 서버 즉시 종료 중... (${ports.length}개)`);

  ports.forEach(port => {
    const server = servers[port];
    if (server.closeAllConnections) server.closeAllConnections();
    server.close(() => {
      console.log(`포트 ${port} 종료됨`);
      delete servers[port];
    });
  });

  // 1초 후 프로세스 강제 종료
  setTimeout(() => {
    if (Object.keys(servers).length > 0) {
      console.log('일부 서버 강제 종료');
      process.exit(0);
    }
  }, 1000);
}

// 서버 시작
SERVERLIST.forEach(s => startServer(s.name, s.port, s.dirt));

console.log('\n=== 즉시 종료 가능 ===');
console.log('http://localhost:8010/shutdown → 1초 내 종료');
console.log('http://localhost:8010/shutdown-all → 모든 서버 즉시 종료');
console.log('stopServer(8010), stopAllServers() 도 가능');
console.log('========================\n');

// REPL용
global.stopServer = stopServer;
global.stopAllServers = stopAllServers;
