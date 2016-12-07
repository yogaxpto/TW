/**
 * Created by Diogo on 28/11/2016.
 *
 * see
 * http://www.dcc.fc.up.pt/~rprior/1617/TW/trabalho/Trabalho-2.html
 * for more info
 */

var name;
var pass;
var request = new XMLHttpRequest();
var url = 'http://twserver.alunos.dcc.fc.up.pt:8000/';
var json;
var response;
var group = 58;
var key;
var game;
var data = '';
var level;
var opponent = '';
var turn = '';
var col = 0;
var row = 0;
var hit;
var multigameinprogress = 0;


function register() {
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


function join() {
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

function leave() {
    data = {'name': name, 'key': key, 'game': game};

    // construct an HTTP request
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url + 'leave', true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

    // send the collected data as JSON
    xhr.send(JSON.stringify(data));

    xhr.onloadend = function () {
        response = JSON.parse(xhr.responseText);

        if (response.error == undefined) {
            multigameinprogress = 0;
            gameover('C');
        }
        else alert('Erro: ' + response.error);

    };
}

function notify() {
    data = {'name': name, 'game': game, 'key': key, 'row': row, 'col': col};
    $('#player_table_container td').unbind('mouseover mouseout click');
    // construct an HTTP request
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url + 'notify', true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

    // send the collected data as JSON
    xhr.send(JSON.stringify(data));

    xhr.onloadend = function () {
        response = JSON.parse(xhr.responseText);

        if (response.error == undefined) {
        }
        else {
            alert('Erro: ' + response.error);
        }


    };
}

function update() {
    var source = new EventSource(url + 'update?name=' + username + '&game=' + game + '&key=' + key);

    source.onmessage = function response(event) {
        var json = JSON.parse(event.data);

        if (json.error != null) {
            event.target.close();
        }

        if (json.opponent) {
            multigameinprogress = 1;
            opponent = json.opponent;
            turn = json.turn;
            $('#waiting').fadeOut('300');
            $('#who').fadeIn('200');
            setTimeout(function () {
                $('#score').fadeIn(300);
            }, 400);

            $('#score').html('SCORE<br>' + username + ': ' + pshotsTaken + '<br><progress max="17" value=' + phits + '></progress><br>' + opponent + ': ' + oshotsTaken + '<br><progress max="17" value=' + mhits + '></progress>');


            updateTable("P");
            updateTable("C");
            alert('Opponent: ' + opponent + ' Turn: ' + turn);
            MultiGame(turn);

        }
        if (json.move != undefined) {
            col = json.move.col;
            row = json.move.row;

            if (json.turn != username) {
                pshotsTaken++;
                shootit('u', json.move.hit);
            }
            else if (json.turn == username) {
                oshotsTaken++;
                shootit('o', json.move.hit);
            }

            setTimeout(function () {
                MultiGame(json.turn);
            }, 1200);

        }


        if (json.winner != undefined) {
            alert("O jogador " + json.winner + " ganhou o jogo!! Parabens!")
            ranking(); //actualiza
            $('#single').fadeOut(200);
            gameover;
        }


    };

}

function ranking() {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url + 'ranking', true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

    // send the collected data as JSON
    xhr.send(JSON.stringify(data));

    xhr.onloadend = function () {
        response = JSON.parse(xhr.responseText);

        if (response.error == undefined) {
            var ranks = response.ranking;

            criar_highscore();

            $('#high tr:eq(0) td:eq(0)').html('Jogador');
            $('#high tr:eq(0) td:eq(1)').html('Pontuacao');

            for (z = 1; z < 11; z++) {
                $('#high tr:eq(' + z + ') td:eq(0)').html(response.ranking[z - 1].name);
                $('#high tr:eq(' + z + ') td:eq(1)').html(response.ranking[z - 1].shots);
            }
        }
        else alert('Erro: ' + response.error);
    };
}
