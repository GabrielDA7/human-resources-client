const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use(jsonServer.bodyParser);

// If you need to scope this behaviour to a particular route, use this
server.post('/login', function(req, res, next) {
  req.method = 'GET';
  req.query = req.body;
  next();
});

server.post('/register', function(req, res, next) {
  req.method = 'GET';
  req.query = req.body;
  next();
});

server.use(router);
server.listen(3000, function() {
  console.log('JSON Server is running');
});
