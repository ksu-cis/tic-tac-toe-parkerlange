﻿// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your Javascript code.

var currentTurn = "X";

document.getElementById("turn").innerText = "It is player " + currentTurn + "'s turn";

var squares = document.getElementsByClassName("square");
for (var i = 0; i < squares.length; i++) {
    squares[i].addEventListener('click', onClick);
}

function onClick(event) {
    event.preventDefault();
    if (!event.target.innerText) {
        event.target.innerHTML = currentTurn; 
        if (!checkForWin()) nextTurn(); 
    }
    
}

function nextTurn() {
    if (currentTurn === "X") {
        currentTurn = "O";
    }
    else {
        currentTurn = "X";
    }

    document.getElementById("turn").innerText = "It is player " + currentTurn + "'s turn";
}

function declareWinner() {
    document.getElementById("turn").innerText = "It is player " + currentTurn + " wins!";
    currentTurn = "";
}

function checkForWin() {
    // check rows
    for (var i = 0; i < 9; i += 3) {
        if (squares[i].innerText && squares[i + 0].innerText === squares[i + 1].innerText && squares[i + 1].innerText === squares[i + 2].innerText) {
            declareWinner();
            return true;
        }
    }

    // check columns
    for (var j = 0; j < 3; j += 1) {
        if (squares[i].innerText && squares[j].innerText === squares[j + 3].innerText && squares[j + 3].innerText === squares[j + 6].innerText) {
            declareWinner();
            return true;
        }
    }

    // check diagonals 

    return false;
}

var squares = document.querySelectorAll("square");
for (var i = 0; i < squares.length; i++) {
    squares[i].addEventListener('dragenter', onDragEnter);
    squares[i].addEventListener('dragleave', onDragLeave);
    squares[i].addEventListener('dragleave', onDragStart);
    squares[i].addEventListener('dragleave', onDragEnd);
}

function onDragEnter(event) {
    if (event.target.classList.contain("checker")) return;
    if (event.target.classList.contain("red")) return;
    if (event.target.children.length > 0) return; 
    event.target.style.backgroundColor = "gold";
    document.getElementById("toX").value = event.target.dataset.x;
    document.getElementById("toY").value = event.target.dataset.y;
}

function onDragLeave(event) {
    event.target.style.backgroundColor = null;
}

function onDragStart(event) {
    document.getElementById("fromX").value = event.target.dataset.x;
    document.getElementById("fromY").value = event.target.dataset.y; 
}

function onDragEnd(event) {
    document.getElementsByName("checkers-form").submit(); 
}