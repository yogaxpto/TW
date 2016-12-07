/**
 * Created by Diogo on 28/11/2016.
 *
 * see
 * http://www.dcc.fc.up.pt/~rprior/1617/TW/trabalho/Trabalho-2.html
 * for more info
 */

var username;
var password;
var request = new XMLHttpRequest();
var url = 'http://twserver.alunos.dcc.fc.up.pt:8000/';
var json;
var response;
var key;
var game;
var data = '';
var opponent = '';
var turn = '';
var col = 0;
var row = 0;
var hit;
var multigameinprogress = 0;


function register(name, pass) {
    /**
     * Return true or false whether the user is successfully registered.
     * Register should also login the user to the server.
     */
    data = {'name': name, 'pass': pass};

    // construct an HTTP request
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url + 'register', true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

    // send the collected data as JSON
    xhr.send(JSON.stringify(data));

    xhr.onloadend = function () {
        response = JSON.parse(xhr.responseText);

        if (response.error == undefined) {
            return true;
        }
        else {
            alert('Erro: ' + response.error);
            return false;
        }
    };

}


function join(group, name, pass, level) {
    data = {'name': name, 'pass': pass, 'level': level, 'group': group};

    // construct an HTTP request
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url + 'join', true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

    // send the collected data as JSON
    xhr.send(JSON.stringify(data));

    xhr.onloadend = function () {
        response = JSON.parse(xhr.responseText);

        if (response.error == undefined) {
            key = response.key;
            game = response.game;
            //TODO next line
            joined();
        }
        else alert('Erro: ' + response.error);
    };
}

function leave(name, key, game) {
}

function notify(name, key, game, orient, row, col) {
}

function update(name, key, game) {
}

function ranking(level) {
}
