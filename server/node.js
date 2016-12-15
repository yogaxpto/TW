/**
 * Created by Diogo and Ana on 11/12/2016.
 *
 * For more info, visit:
 * http://www.dcc.fc.up.pt/~rprior/1617/TW/trabalho/Trabalho-3.html
 */

var http = require('http');
var group=58;
// inclusão de módulo
var server = http.createServer(
    function (request, response) {
        response.writeHead(200, {'Content-Type': 'text / plain'});
        response.end('Hello World!');
    }
);
server.listen(8000+group);
