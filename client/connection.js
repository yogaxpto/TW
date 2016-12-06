/**
 * Created by Diogo on 28/11/2016.
 *
 * see
 * http://www.dcc.fc.up.pt/~rprior/1617/TW/trabalho/Trabalho-2.html
 * for more info
 */

var con= new XMLHttpRequest();


function register(name,pass) {
    con.open("GET", "twserver.alunos.dcc.fc.up.pt:8000", true, name, pass);
}

/*
function login(name,pass){}
*/

function join(group, name, pass, level) {}

function leave(name, key, game) {}

function notify(name, key, game, orient, row, col){}

function update(name, key, game){}

function ranking(level){}
