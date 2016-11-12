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
    if (document.getElementById('username').value === "" || document.getElementById('password') == "") {
        alert("Wrong credentials.\nTry again.");
        return;
    }
    else {
        alert('Logged as ' + document.getElementById('username').value + '.');
        //TODO change navbar login name to username's and set something below to allow to logout
        set_tab('mode');
        return;
    }
}

function play() {
    //TODO set tab (game)
    //TODO create table with set difficulty
    //TODO start the game with the bot only
    set_tab('game');
    getvalue();
}

function getvalue(){
    var diff = document.getElementById("difficulty");

    if(diff == "beginner")
        set_table(2,3);
    else if(diff == "intermediate")
        set_table(4,5);
    else if(diff == "advanced")
        set_table(6,8);
    else
        set_table(9,11);
}


function set_table(nrow, ncell){
    removertabela();

    var body= document.getElementById("game");

    var tabela = document.createElement("table");
    var tabbody = document.createElement("tbody");

    tabela.setAttribute("id", "tabl");


    for(var i=0; i < nrow*2+1; i++){
        var row = document.createElement("tr");
        for(var j=0; j< ncell*2+1; j++){
            var cell = document.createElement("td");
            if(i%2==0 && j%2==0){
                var circulo = document.createTextNode("\u25CD");
                cell.appendChild(circulo);
                cell.setAttribute("class", "cir");
                cell.setAttribute("id", i + "," + j);
                row.appendChild(cell);
            }
            else if(i%2==0 && j%2==1){
                cell.setAttribute("class", "hor");
                cell.setAttribute("id", i + "," +j);
                cell.onclick = function(){hmove(this.id, "player1");} //para desenhar horizontal
                row.appendChild(cell);
            }
            else if(i%2==1 && j%2==0){
                cell.setAttribute("class", "ver");
                cell.setAttribute("id", i + "," +j);
                cell.onclick = function(){vmove(this.id, "player1");} //vertical;
                row.appendChild(cell);
            }
            else{
                cell.setAttribute("class", "meio");
                cell.setAttribute("id", i + "," +j);
                row.appendChild(cell);
            }
        }
        tabbody.appendChild(row);
    }
    tabela.appendChild(tabbody);
    body.appendChild(tabela);

}

// apaga a tabela caso exista uma
function removertabela(){
    var rm = document.getElementById("tabl");
    if(rm)
        rm.parentNode.removeChild(rm);
}

function hmove(pos, user){

    //Move on horizontal cell
    var getpos = pos.split(",");
    var row = parseInt(getpos[0]);
    var col = parseInt(getpos[1]);   //split the id to get the row and col value
    var f1 = false;
    var f2 = false;

    //if the user clicks on black square, do nothing
    if (row%2 == 1 || col%2 == 0)
        return;
    //if the move has already been made, do nothing
    if (board[row][col] == 0)
        return;
    board[row][col] = 0;

    if (lastMove!="") {
        var lastpos = last.split(",");
        var lastrow = parseInt(lastpos[0]);
        var lastcol = parseInt(lastpos[1]);
        //if horizontal or vertical cell
        if ((lastrow%2 == 1 && lastcol == 0) || (lastrow%2 == 0 && lastcol%2 ==1)) {
            var a = document.getElementById(row+','+col);
            a.className="played";
        }
    }
    if (user == "p") {
        var a = document.getElementById(row+','+col);
        a.className="played";
    }

    else {
        var a = document.getElementById(row+','+col);
        a.className="played";
        last = pos;
    }


    //call checkSquare recursively to check if a square has been made.
    if (eval(row+1) < board.length)
        f1 = checkSquare(eval(row+1) + "," + col, user);

    if (eval(row-1 >= 0))
        f2 = checkSquare(eval(row-1) + "," + col, user);

    if ((!f1 && !f2 && user=="p") || ((f1 || f2) && user =="c"))
        cpuMove();
    else
        checkEndGame();
}

function vmove(pos,user) {

    //Move on vertical cell
    //Similar to hmove
    var getpos = pos.split(",");
    var row = parseInt(getpos[0]);
    var col = parseInt(getpos[1]);
    var f1 = false;
    var f2 = false;

    if (row%2 == 0 || col%2 == 1)
        return;

    if (board[row][col] == 0)
        return;
    board[row][col] = 0;

    if (lastMove!="") {
        var lastpos = last.split(",");
        var lastrow = parseInt(lastpos[0]);
        var lastcol = parseInt(lastpos[1]);
        //if horizontal or vertical cell


        if ((row%2 == 0 && col%2 == 1) || (row%2 == 1 && col%2 == 0)) { //check if the move is on a playable cell (not on the square)
            var a = document.getElementById(row+','+col);
            a.className="played";
        }
    }

    if (user == "c") {
        var a = document.getElementById(row+','+col);
        a.className="played";
    }

    else {
        var a = document.getElementById(row+','+col);
        a.className="played";
        last = pos;
    }

    if (eval(col+1) < board[row].length)
        f1 = checkSquare(row + "," + eval(col+1), user);

    if (eval(col-1 >= 0))
        f2 = checkSquare(row + "," + eval(col-1), user);

    if ((!f1 && !f2 && user=="p") || ((f1 || f2) && user =="c"))
        cpuMove();
    else
        checkEndGame();

}

function cpuMove() {
    if (checkEndGame() !=false)
        return;

    for (var i=0;i<board.length;i++) {
        for (var j=0;j<board[i].length;j++) {
            if ((i%2 == 1 && j%2 == 0)) {
                var a = document.getElementById(i+','+j);
                if (a.className != "played"){
                    vmove(i+','+j, "c");
                    return;
                }
            }

            else if (i%2 == 0 && j%2 == 1) {
                var a = document.getElementById(i+','+j);
                if (a.className != "played") {
                    hmove(i+','+j, "c");
                    return;
                }
            }
        }
    }

}
function checkSquare(pos,user) {
    var checked = false;
    var getpos = pos.split(",");
    var row = parseInt(getpos[0]);
    var col = parseInt(getpos[1]);
    //if the row or col is in position 0, it's on the border and not a square.
    if (row%2 == 0 || col%2 == 0)
    {
        return;
    }
    //check if neighbour cells are checked and fill the middle cell if they are.
    if (!board[row-1][col] && !board[row+1][col] && !board[row][col-1] && !board[row][col+1]) {
        checked = true;
        var a = document.getElementById(row + ',' + col);
        if (user == "p") {
            a.className = "filledP";
            ownedCells[Math.floor(row/2)][Math.floor(col/2)] = "p";
        }
        else {
            a.className = "filledCPU";
            ownedCells[Math.floor(row/2)][Math.floor(col/2)] = "c";
        }
        checkEndGame();
    }
    return checked;
}

function checkEndGame() {
    var v = new Array();
    for (var i=0;i<board.length;i++) {
        for (var j=0;j<board[i].length;j++) {
            if (i%2 == 1 && j%2 == 1) {
                if (!board[i-1][j] && !board[i+1][j] && !board[i][j-1] && !board[i][j+1]) {
                    v[v.length] = i + ',' + j;
                }
            }
        }
    }

    if (v.length == (temp1)*(temp2)) {
        var player_score=0;
        var cpu_score=0;
        for (var i=0;i<ownedCells.length;i++) {
            for (var j=0;j<ownedCells[i].length;j++) {
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


