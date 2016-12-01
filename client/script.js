/**
 * Created by Diogo on 20/09/2016.
 */
var table, ownedCells;

function set_tab(tab) {
    document.getElementById('login').style.display = 'none';
    document.getElementById('mode').style.display = 'none';
    document.getElementById('game').style.display = 'none';
    document.getElementById('highscores').style.display = 'none';
    document.getElementById(tab).style.display = 'block';
    return;
}

function register() {
    //for now, do as the login() function
    login();
}

function login() {
    if (document.getElementById('username').value === "" || document.getElementById('password') == "") {
        alert("Wrong credentials.\nTry again.");
        return;
    }
    else {
        alert('Logged as ' + document.getElementById('username').value + '.');
        //TODO change navbar login name to username's and set something below to allow to logout
        document.getElementById('nav_bar_login').innerHTML = document.getElementById('username').value;
        set_tab('mode');
        document.getElementById('nav_bar_login').onclick = "";
        document.getElementById('nav_bar_login').onclick = display_logout();
        return;
    }
}

function display_logout() {
    if (confirm("Do you wish to logout?")) {
        set_tab('login');
        document.getElementById('nav_bar_login').innerHTML = 'Login'
        document.getElementById('nav_bar_login').onclick = set_tab('login');
        return;
    }
    else {
        return;
    }
}

function play() {
    set_tab('game');
    getvalue();
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
    return;
}


function set_table(nrow, ncell) {
    removertabela();
    table = new Array(nrow);

    temp1=nrow;
    temp2=ncell;

    var body = document.getElementById("game");
    lastMove="";
    var tabela = document.createElement("table");
    var tabbody = document.createElement("tbody");

    tabela.setAttribute("id", "tabl");

    ownedCells = new Array(nrow-1);

    for (var i = 0; i < nrow * 2 + 1; i++) {
        table[i] = new Array(ncell);
        var row = document.createElement("tr");
        for (var j = 0; j < ncell * 2 + 1; j++) {
            var cell = document.createElement("td");
            if (i % 2 == 0 && j % 2 == 0) {
                var circulo = document.createTextNode("\u25CD");
                cell.appendChild(circulo);
                cell.setAttribute("class", "cir");
                cell.setAttribute("id", i + "," + j);
                row.appendChild(cell);
            }
            else if (i % 2 == 0 && j % 2 == 1) {
                cell.setAttribute("class", "hor");
                cell.setAttribute("id", i + "," + j);
                cell.onclick = function () {
                    hmove(this.id, "player1");
                } //para desenhar horizontal
                row.appendChild(cell);
            }
            else if (i % 2 == 1 && j % 2 == 0) {
                cell.setAttribute("class", "ver");
                cell.setAttribute("id", i + "," + j);
                cell.onclick = function () {
                    vmove(this.id, "player1");
                } //vertical;
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


        if ((row % 2 == 0 && col % 2 == 1) || (row % 2 == 1 && col % 2 == 0)) { //check if the move is on a playable cell (not on the square)
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
    var v = new Array();
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


