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
var data='';
var opponent='';
var turn='';
var col=0;
var row=0;
var hit;
var multigameinprogress=0;


function register(name,pass) {
    /**
     * Return true or false whether the user is successfully registered.
     */
    con.open("GET", "twserver.alunos.dcc.fc.up.pt:8000", true, name, pass);
}


function login(name,pass){}


function join(group, name, pass, level) {}

function leave(name, key, game) {}

function notify(name, key, game, orient, row, col){}

function update(name, key, game){}

function ranking(level){}
