/**
 * Created by Diogo on 20/09/2016.
 */
function set_tab(tab) {
    document.getElementsByClassName("login").style.display="none";
    document.getElementsByClassName("mode").style.display="none";
    document.getElementsByClassName("game").style.display="none";
    document.getElementsByClassName("highscores").style.display="none";
    document.getElementsByClassName(tab).style.display="block";
}