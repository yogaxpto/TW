/**
 * Created by Diogo
 * and Ana Sofia Cepeda Germano
 * on 20/09/2016.
 */
var table;
var ownedCells;


function set_tab(tab) {
    document.getElementById('login').style.display = 'none';
    document.getElementById('mode').style.display = 'none';
    document.getElementById('game').style.display = 'none';
    document.getElementById('wait').style.display='none';
    document.getElementById('highscores').style.display = 'none';
    document.getElementById(tab).style.display = 'block';

}

function validate(value) {
    /*
     returns true if there are no special characters.
     */

    var format = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;

    if (format.test(value))
        return false;
    return true;
}

function validate_register() {
    //for now, do as the validate_login() function
    if (validate(document.getElementById('username').value) && validate(document.getElementById('password').value))
        validate_login();
    else {
        alert("Username or password contain an invalid character.\nPlease try again.");
    }
}

function validate_login() {
    if (validate(document.getElementById('username').value) && validate(document.getElementById('password').value)) {
        name = document.getElementById('username').value;
        pass = document.getElementById('password').value;
        register();
    }
    else {
        alert("Wrong credentials.\nTry again.");
    }
}

function register_sucess(){
    document.getElementById('nav_bar_login').innerHTML = name;
    document.getElementById('nav_bar_login').onclick = null;
    document.getElementById('nav_bar_login').onclick = new Function("display_logout()");
    set_tab('mode');
}

function display_logout() {
    if (confirm("Do you wish to logout?")) {
        set_tab('login');
        document.getElementById('nav_bar_login').innerHTML = 'Login';
        document.getElementById('nav_bar_login').onclick = set_tab('login');

    }
    else {
        return;
    }
}

function play() {
    set_tab('game');
    getvalue();
}

function multiplayer_play() {
    var difficulty;
    if (document.getElementById('beginner').checked)
        difficulty = 'beginner';
    else if (document.getElementById('intermediate').checked)
        difficulty = 'intermediate';
    else if (document.getElementById('advanced').checked)
        difficulty = 'advanced'
    else
        difficulty = 'expert'
    level=difficulty;
    join();
}
function wait_for_next_player() {
    set_tab('wait');
}

function getvalue() {

    if (document.getElementById('beginner').checked) {
        set_table(2, 3);
        return;
    }
    else if (document.getElementById('intermediate').checked) {
        set_table(4, 5);
        return;
    }
    else if (document.getElementById('advanced').checked) {
        set_table(6, 8);
        return;
    }
    else
        set_table(9, 11);

}

function get_cords(position) {
    var getpos = position.split(",");
     row = parseInt(getpos[0]);
     col = parseInt(getpos[1]);
}

function set_table(nrow, ncell) {

    removertabela();
    table = new Array(nrow);

    temp1 = nrow;
    temp2 = ncell;

    var body = document.getElementById("game");
    lastMove = "";
    var tabela = document.createElement("table");
    var tabbody = document.createElement("tbody");

    tabela.setAttribute("id", "tabl");

    ownedCells = new Array(nrow - 1);

    for (var i = 0; i < nrow * 2 + 1; i++) {
        table[i] = new Array(ncell);
        var row = document.createElement("tr");
        for (var j = 0; j < ncell * 2 + 1; j++) {
            var cell = document.createElement("td");
            if (i % 2 == 0 && j % 2 == 0) {
                var circulo = document.createElement("canvas");
                circulo.setAttribute("id", "cir_canvas");
                var ctx = circulo.getContext("2d");
                ctx.beginPath();
                ctx.arc(35, 30, 30, 0, Math.PI * 2); // (hor,ver,length,0,arc)
                ctx.fillStyle = "#000000";
                ctx.fill();
                ctx.stroke();
                cell.appendChild(circulo);
                cell.setAttribute("class", "cir");
                cell.setAttribute("id", i + "," + j);
                row.appendChild(cell);
            }
            else if (i % 2 == 0 && j % 2 == 1) {
                cell.setAttribute("class", "hor");
                cell.setAttribute("id", i + "," + j);
                cell.onclick = function () {
                    get_cords(this.id);
                    hmove(this.id, "player1");
                }; //horizontal
                row.appendChild(cell);
            }
            else if (i % 2 == 1 && j % 2 == 0) {
                cell.setAttribute("class", "ver");
                cell.setAttribute("id", i + "," + j);
                cell.onclick = function () {
                    get_cords(this.id);
                    vmove(this.id, "player1");
                }; //vertical;
                row.appendChild(cell);
            }
            else {
                cell.setAttribute("class", "meio");
                cell.setAttribute("id", i + "," + j);
                row.appendChild(cell);
            }
        }
        tabbody.appendChild(row);
    }
    tabela.appendChild(tabbody);
    body.appendChild(tabela);
}

// apaga a tabela caso exista uma
function removertabela() {
    var rm = document.getElementById("tabl");
    if (rm)
        rm.parentNode.removeChild(rm);
}

function hmove(pos, user) {

    //Move on horizontal cell
    var getpos = pos.split(",");
    var row = parseInt(getpos[0]);
    var col = parseInt(getpos[1]);   //split the id to get the row and col value
    var f1 = false;
    var f2 = false;


    //if the user clicks on black square, do nothing
    if (row % 2 == 1 || col % 2 == 0)
        return;
    //if the move has already been made, do nothing
    if (table[row][col] == 0)
        return;
    table[row][col] = 0;

    if (lastMove != "") {
        var lastpos = last.split(",");
        var lastrow = parseInt(lastpos[0]);
        var lastcol = parseInt(lastpos[1]);
        //if horizontal or vertical cell
        if ((lastrow % 2 == 1 && lastcol == 0) || (lastrow % 2 == 0 && lastcol % 2 == 1)) {
            var a = document.getElementById(row + ',' + col);
            a.className = "played";
            a.name = user;
        }
    }
    if (user == "p") {
        var a = document.getElementById(row + ',' + col);
        a.className = "played";
        a.name = user;
    }
    else {
        var a = document.getElementById(row + ',' + col);
        a.className = "playedCPU";
        a.name = user;
        last = pos;
    }

    //call checkSquare recursively to check if a square has been made.
    if (eval(row + 1) < table.length)
        f1 = checkSquare(eval(row + 1) + "," + col, user);

    if (eval(row - 1 >= 0))
        f2 = checkSquare(eval(row - 1) + "," + col, user);

    if ((!f1 && !f2 && user == "p") || ((f1 || f2) && user == "c"))
        cpuMove();
    else
        checkEndGame();
}

function vmove(pos, user) {
    //Move on vertical cell
    //Similar to hmove
    var getpos = pos.split(",");
    var row = parseInt(getpos[0]);
    var col = parseInt(getpos[1]);
    var f1 = false;
    var f2 = false;

    if (row % 2 == 0 || col % 2 == 1)
        return;

    if (table[row][col] == 0)
        return;
    table[row][col] = 0;

    if (lastMove != "") {
        var lastpos = last.split(",");
        var lastrow = parseInt(lastpos[0]);
        var lastcol = parseInt(lastpos[1]);
        //if horizontal or vertical cell

        //check if the move is on a playable cell (not on the square)
        if ((row % 2 == 0 && col % 2 == 1) || (row % 2 == 1 && col % 2 == 0)) {
            var a = document.getElementById(row + ',' + col);
            a.className = "played";
            a.name = user;
        }
    }

    if (user == "c") {
        var a = document.getElementById(row + ',' + col);
        a.className = "playedCPU";
        a.name = user;
    }

    else {
        var a = document.getElementById(row + ',' + col);
        a.className = "played";
        a.name = user;
        last = pos;
    }

    if (eval(col + 1) < table[row].length)
        f1 = checkSquare(row + "," + eval(col + 1), user);

    if (eval(col - 1 >= 0))
        f2 = checkSquare(row + "," + eval(col - 1), user);

    if ((!f1 && !f2 && user == "p") || ((f1 || f2) && user == "c"))
        cpuMove();
    else
        checkEndGame();
}

function cpuMove() {
    if (checkEndGame() != false)
        return;

    for (var i = 0; i < table.length; i++) {
        for (var j = 0; j < table[i].length; j++) {
            if ((i % 2 == 1 && j % 2 == 0)) {
                var a = document.getElementById(i + ',' + j);
                if (a.className != "played") {
                    vmove(i + ',' + j, "c");
                    return;
                }
            }

            else if (i % 2 == 0 && j % 2 == 1) {
                var a = document.getElementById(i + ',' + j);
                if (a.className != "played") {
                    hmove(i + ',' + j, "c");
                    return;
                }
            }
        }
    }
}

function checkSquare(pos, user) {
    var checked = false;
    var getpos = pos.split(",");
    var row = parseInt(getpos[0]);
    var col = parseInt(getpos[1]);
    //if the row or col is in position 0, it's on the border and not a square.
    if (row % 2 == 0 || col % 2 == 0) {
        return;
    }
    //check if neighbour cells are checked and fill the middle cell if they are.
    if (!table[row - 1][col] && !table[row + 1][col] && !table[row][col - 1] && !table[row][col + 1]) {
        checked = true;
        var a = document.getElementById(row + ',' + col);
        if (user == "p") {
            a.className += " filledP";
            ownedCells[Math.floor(row / 2)][Math.floor(col / 2)] = "p";
        }
        else {
            a.className += " filledCPU";
        }
        checkEndGame();
    }
    return checked;
}

function checkEndGame() {
    var v = [];
    for (var i = 0; i < table.length; i++) {
        for (var j = 0; j < table[i].length; j++) {
            if (i % 2 == 1 && j % 2 == 1) {
                if (!table[i - 1][j] && !table[i + 1][j] && !table[i][j - 1] && !table[i][j + 1]) {
                    v[v.length] = i + ',' + j;
                }
            }
        }
    }

    if (v.length == (temp1) * (temp2)) {
        var player_score = 0;
        var cpu_score = 0;
        for (var i = 0; i < ownedCells.length; i++) {
            for (var j = 0; j < ownedCells[i].length; j++) {
                if (ownedCells[i][j] == "p")
                    player_score++;
                else
                    cpu_score++;
            }
        }


        if (player_score > cpu_score) {
            alert("We have a Winner! Your score: " + player_score + " Computer score: " + cpu_score);
            return;
        }
        else if (player_score < cpu_score) {
            alert("You lost! Your score: " + player_score + " Computer score: " + cpu_score);
            return;
        }
        else {
            alert("Draw! Your score: " + player_score + " Computer score: " + cpu_score);
            return;
        }
    }
    return false;
}

function highs() {
    set_tab('highscores');
    tab_highscores();
}

function MultiGame(turn){

}
//função da tabela highscores
function tab_highscores() {

    var body = document.getElementById("highscores");
    var tab = document.createElement("table"); //cria a tabela
    var tab_thead = document.createElement("thead"); //1º linha com os campos
    tab.setAttribute("class", "tab_highscores");
    tab_thead.setAttribute("id", "tab_thead");

    //cabeçalho da tabela
    for (var i = 0; i < 1; i++) {
        var linha = document.createElement("tr");
        linha.setAttribute("id", "linha");
        for (var j = 0; j < 6; j++) {
            var coll = document.createElement("th");
            if (j == 0) {
                var num = document.createTextNode("Num");
                coll.appendChild(num);
                linha.appendChild(coll);
            }
            if (j == 1) {
                var score = document.createTextNode("Score");
                coll.appendChild(score);
                linha.appendChild(coll);
            }
            if (j == 2) {
                var name = document.createTextNode("Name");
                coll.appendChild(name);
                linha.appendChild(coll);
            }
            if (j == 3) {
                var duration = document.createTextNode("Duration");
                coll.appendChild(duration);
                linha.appendChild(coll);
            }
            if (j == 4) {
                var mode = document.createTextNode("Mode");
                coll.appendChild(mode);
                linha.appendChild(coll);
            }
            if (j == 5) {
                var result = document.createTextNode("Result");
                coll.appendChild(result);
                linha.appendChild(coll);
            }
        }
        tab_thead.appendChild(linha);
    }
    tab.appendChild(tab_thead);
    var tab_body = document.createElement("tbody");

    //corpo da tabela
    for (var i = 0; i < 10; i++) {
        var linha = document.createElement("tr");
        for (var j = 0; j < 6; j++) {
            var coll = document.createElement("td");
            if (j == 0) {
                var num = document.createTextNode("Num");
                coll.appendChild(num);
                linha.appendChild(coll);
            }
            if (j == 1) {
                var score = document.createTextNode("Score");
                coll.appendChild(score);
                linha.appendChild(coll);
            }
            if (j == 2) {
                var name = document.createTextNode("Name");
                coll.appendChild(name);
                linha.appendChild(coll);
            }
            if (j == 3) {
                var duration = document.createTextNode("Duration");
                coll.appendChild(duration);
                linha.appendChild(coll);
            }
            if (j == 4) {
                var mode = document.createTextNode("Mode");
                coll.appendChild(mode);
                linha.appendChild(coll);
            }
            if (j == 5) {
                var result = document.createTextNode("Result");
                coll.appendChild(result);
                linha.appendChild(coll);
            }
        }
        tab_body.appendChild(linha);
    }
    tab.appendChild(tab_body);
    body.appendChild(tab);
    console.log(tbody)
}


