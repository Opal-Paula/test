/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


//Rock–paper–scissors/Ro-Sham-Bo
'use strict';

function play() {
    var user, computer, output, result;
    var roshambo = ['Rock', 'Paper', 'Scissors'];
//    console.log('roshambo', roshambo);    
    computer = Math.round(Math.random() * 2);
    user = Math.round(Math.random() * 2);
//    console.log('computer: ', computer, 'user: ', user);


    output = 'Computer choice:' + '"' + roshambo[computer] + '"' + '\nUser choice:' + '"' + roshambo[user] + '"';
//    console.log(output);
    result = '\nComputer wins!';
    var bkgUser = background('user', roshambo[user]);
    var bkgComputer = background('computer', roshambo[computer]);
    if (user === computer) {
        result = 'It\'s a tie!';
        console.log(result);
        bkgUser, bkgComputer;
    } else if (((roshambo[user] === 'Rock') && (roshambo[computer] === 'Paper'))
            || (roshambo[user] === 'Paper') && (roshambo[computer] === 'Scissors')
            || ((roshambo[user] === 'Scissors') && (roshambo[computer] === 'Rock'))) {
        //rock vs paper => paper wins
        //paper vs scissors => scissors wins
        //scissors vs rock => rock wins
        console.log(output, result);
        bkgUser, bkgComputer;
    } else {
        result = '\nUser wins!';
        console.log(output, result);
        bkgUser, bkgComputer;
    }

    //for the visual part
    function background(vars, name) {
        var doc = document.getElementById(vars);
        if (roshambo[0] === name) {
            doc.classList.add('rock');
        }
        if (roshambo[1] === name) {
            doc.classList.add('paper');
        }
        if (roshambo[2] === name) {
            doc.classList.add('scissors');
        }
    }
    document.querySelector('.result').innerText = result;
    var btn = document.querySelector('.js-reloads');
    btn.addEventListener('click', reloading);
    function reloading() {
        location.reload();
    }
}
play();

