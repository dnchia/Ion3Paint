var express = require('express'),
  app = express();

const path = require('path');

// If an incoming request uses
// a protocol other than HTTPS,
// redirect that request to the
// same url but with HTTPS
const forceSSL = function() {
  return function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(
        ['https://', req.get('Host'), req.url].join('')
      );
    }
    next();
  }
};
// Instruct the app
// to use the forceSSL
// middleware
app.use(forceSSL());

app.use(express.static('/www'));
app.set('port', process.env.PORT || 8080);


app.listen(app.get('port'), function () {

  console.log('Express server listening on port ' + app.get('port'));
});
