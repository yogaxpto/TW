/**
 * Created by Diogo on 20/09/2016.
 */
function set_tab(tab) {
    document.getElementById('login').style.display = 'none';
    document.getElementById('mode').style.display = 'none';
    document.getElementById('game').style.display = 'none';
    document.getElementById('highscores').style.display = 'none';
    document.getElementById(tab).style.display = 'inline';
    return;
}

function register() {
    //for now, do as the login() function
    login();
}

function login() {
    if (document.getElementsByName('username').value === "" || document.getElementById('password') == "") {
        alert("Wrong credentials.\nTry again.");

    }
    else {
        alert('Logged as ' + document.getElementsByClassName('username').value + '.');
        //TODO change navbar login name to username's and set something below to allow to logout
        set_tab('mode');
        return;
    }
}

function play() {
    //TODO set tab (game)
    //TODO create table with set difficulty
    //TODO start the game with the bot only
}