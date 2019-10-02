var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const http = require('http');
const sockjs = require('sockjs');
const connectionManager = require('./config/manager');
const utils = require('./middleware/utils')

var app = express();

// Setup express server port fron ENV, default: 3000

app.listen(app.get('port'))
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static('public'))

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const sockjsHandler = sockjs.createServer({
  sockjs_url: 'http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js'
});

sockjsHandler.on('connection', conn => {
  handler = setInterval(() => {
    conn.write('\n')
  }, 10000)

  conn.messageId = utils.makeId(8)
  conn.destination = ''
  conn.sub = ''
  conn.username = ''
  conn.subForName = ''
  conn.messageCount = 100000000

  conn.on('data', message => {
    if (message.indexOf('CONNECT') == 0) {
      conn.write("CONNECTED\nversion:1.2\nheart-beat:10000,10000\n\n\u0000")
    } else if (message.indexOf('SUBSCRIBE') == 0) {
      const firstLetter = message.indexOf("id:")
      const lastLetter = message.indexOf("destination:") + 12
      const sub = message.substring(firstLetter + 3, lastLetter - 13)
      const destination = message.substring(lastLetter, message.length - 3)
      /*
      conn.destinations.push(destination)
      conn.subs.push(sub)
      let ds = conn.destinations.filter((destination, index) => {
        return conn.destinations.indexOf(destination) === index
      })
      let s = conn.subs.filter((su, index) => {
        return conn.subs.indexOf(su) === index
      })
      conn.destinations = ds;
      conn.subs = s;
      */
      if (destination.indexOf('/topic/pnl') == 0) {
        // require info for user
        conn.username = destination.substring(11, destination.length)
        //console.log("user login : " + conn.username)
        conn.subForName = sub
      } else {
        // require data
        conn.sub = sub
        conn.destination = destination
      }

    } else if (message.indexOf("UNSUBSCRIBE") == 0) {
      const firstLetter = message.indexOf("id:")
      const sub = message.substring(firstLetter, message.length - 3)
      /*
      const index = conn.subs.indexOf(sub);
      const des = conn.destinations[index];
      conn.subs = conn.subs.filter(s => s != sub)
      conn.destinations = conn.destinations.filter(d => d != des)
      */

      if (conn.sub == sub) {
        conn.sub = '';
        conn.destinations = '';
      } else if (conn.subForName == sub) {
        conn.username = ''
        conn.subForName = ''
      }
    }
  })
  conn.on('close', () => {
    connectionManager.removeConnection(conn)
    //console.log("user logout : " + conn.username)
    clearInterval(handler)
  });

  connectionManager.pushConnection(conn)
});

const server = http.createServer(app);
sockjsHandler.installHandlers(server, { prefix: '/ws-quote' });

server.listen(3000, '0.0.0.0', () => {
  console.log(' [*] Listening on 0.0.0.0:3000');
});

app.use(require('./routes'))

module.exports = app;
