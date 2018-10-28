const http = require('http'),
  io = require('socket.io'),
  fs = require('fs');

const spawn = require('child_process').spawn;
const lines = process.env.LINES || 10;
const filename = process.env.FILEPATH;

if (!filename) {
  throw new Error("Usage: LINES=3 FILEPATH=<filepath_to_watch> node logger.js, or check package.json script")
}

/**
 * server setup
 */
server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' })
  fs.readFile(__dirname + '/index.html', (err, data) => {
    res.write(data, 'utf8');
    res.end();
  });
})

const port = process.env.PORT || 4002;
server.listen(port, '0.0.0.0', () => {
  console.log(`server running at port: ${port}`);
  console.log(`Please visit http://localhost:${port} to watch server logs`);
});
/**
 * socket setup
 */
io.listen(server).on('connection', (client) => {
  const tail = spawn("tail", ["-f", "-n", lines, filename]);
  client.send({ filename: filename });

  tail.stdout.on("data", (data) => {
    client.send({ tail: data.toString('utf-8') })
  });
});
